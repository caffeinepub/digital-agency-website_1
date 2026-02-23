import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    websiteType: string;
    features: string;
    additionalNotes: string;
    fullName: string;
    deadline: string;
    companyName: string;
    emailAddress: string;
    phoneNumber: string;
    budget: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteInquiry(id: bigint): Promise<void>;
    deleteUserProfile(user: Principal): Promise<void>;
    getAllInquiries(): Promise<Array<[bigint, Inquiry]>>;
    getAllUserProfiles(): Promise<Array<[Principal, UserProfile]>>;
    getCallerRole(): Promise<UserRole>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiry(id: bigint): Promise<Inquiry | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    login(username: string, password: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInquiry(fullName: string, emailAddress: string, phoneNumber: string, companyName: string, websiteType: string, features: string, budget: string, deadline: string, additionalNotes: string): Promise<bigint>;
}
