import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // User profile type
  public type UserProfile = {
    name : Text;
  };

  // Inquiry type
  public type Inquiry = {
    fullName : Text;
    emailAddress : Text;
    phoneNumber : Text;
    companyName : Text;
    websiteType : Text;
    features : Text;
    budget : Text;
    deadline : Text;
    additionalNotes : Text;
  };

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Store user profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Store inquiries
  var nextInquiryId = 0;
  let inquiries = Map.empty<Nat, Inquiry>();

  // Login endpoint - validates credentials and assigns admin role
  public shared ({ caller }) func login(username : Text, password : Text) : async Text {
    if (username != "admin" or password != "admin123") {
      Runtime.trap("Invalid credentials");
    };

    AccessControl.assignRole(accessControlState, caller, caller, #admin);

    "Authentication successful";
  };

  // Get caller's own profile (user permission required)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  // Get any user's profile (admin can view any, users can only view their own)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not Principal.equal(caller, user) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save caller's profile (user permission required)
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin-only: Get all user profiles
  public query ({ caller }) func getAllUserProfiles() : async [(Principal, UserProfile)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    userProfiles.toArray();
  };

  // Admin-only: Delete a user profile
  public shared ({ caller }) func deleteUserProfile(user : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete profiles");
    };
    userProfiles.remove(user);
  };

  // Admin-only: Assign role to a user
  public shared ({ caller }) func assignUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // Get caller's role
  public query ({ caller }) func getCallerRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  // Public inquiry submission endpoint - no authentication required
  // This allows anyone (including guests/anonymous users) to submit inquiries
  public shared ({ caller }) func submitInquiry(
    fullName : Text,
    emailAddress : Text,
    phoneNumber : Text,
    companyName : Text,
    websiteType : Text,
    features : Text,
    budget : Text,
    deadline : Text,
    additionalNotes : Text,
  ) : async Nat {
    // No authorization check - public endpoint for potential clients
    let inquiry : Inquiry = {
      fullName;
      emailAddress;
      phoneNumber;
      companyName;
      websiteType;
      features;
      budget;
      deadline;
      additionalNotes;
    };

    inquiries.add(nextInquiryId, inquiry);
    let currentId = nextInquiryId;
    nextInquiryId += 1;
    currentId;
  };

  // Admin-only: Get all inquiries
  public query ({ caller }) func getAllInquiries() : async [(Nat, Inquiry)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.toArray();
  };

  // Admin-only: Get a specific inquiry
  public query ({ caller }) func getInquiry(id : Nat) : async ?Inquiry {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.get(id);
  };

  // Admin-only: Delete an inquiry
  public shared ({ caller }) func deleteInquiry(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    inquiries.remove(id);
  };
};
