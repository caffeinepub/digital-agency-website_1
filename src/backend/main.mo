import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type AdminToken = Text;

  public type UserProfile = {
    name : Text;
  };

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

  let adminToken : AdminToken = "admin-token"; // Only intended to be used on initialization of actor. Revoke after deployment.

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextInquiryId = 0;
  let inquiries = Map.empty<Nat, Inquiry>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not Principal.equal(caller, user) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getAllUserProfiles() : async [(Principal, UserProfile)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    userProfiles.toArray();
  };

  public shared ({ caller }) func deleteUserProfile(user : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete profiles");
    };
    userProfiles.remove(user);
  };

  public shared ({ caller }) func assignUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // Intentionally public: Allows frontend to verify caller's role for UI rendering
  // Returns the role of the caller (including guests). No sensitive data is exposed
  // as each caller can only see their own role.
  public query ({ caller }) func getCallerRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  // Public endpoint: Allows unauthenticated users (guests) to submit contact inquiries
  // This is intentional to enable potential clients to reach out without authentication
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

  public query ({ caller }) func getAllInquiries() : async [(Nat, Inquiry)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.toArray();
  };

  public query ({ caller }) func getInquiry(id : Nat) : async ?Inquiry {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.get(id);
  };

  public shared ({ caller }) func deleteInquiry(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };
    inquiries.remove(id);
  };

  public shared ({ caller }) func initializeActorAsAdmin(userProvidedToken : Text) : async () {
    AccessControl.initialize(accessControlState, caller, adminToken, userProvidedToken);
  };
};
