import { User as FirebaseAuthUser } from "firebase/auth"

/**
 * Different custom progress bar types.
 * @enum {string}
 */
export enum ProgressBarType {
    DOWNLOAD = "DOWNLOAD",
    UPLOAD = "UPLOAD"
}

/**
 * Define the current authenticated user in the Firebase app.
 * @typedef {Object} AuthUser
 * @property {FirebaseAuthUser} user - the instance of the Firebase authenticated user.
 * @property {string} token - the access token.
 * @property {string} providerUserId - the unique identifier of the user tied to its account from a third party provider (e.g., Github).
 */
export type AuthUser = {
    user: FirebaseAuthUser
    token: string
    providerUserId: string
}

/**
 * Define a custom object for time management tasks.
 * @typedef {Object} Timing
 * @property {number} seconds
 * @property {number} minutes
 * @property {number} hours
 * @property {number} days
 */
export type Timing = {
    seconds: number
    minutes: number
    hours: number
    days: number
}

/**
 * Define a custom object containing contribution verification data.
 * @typedef {Object} VerifyContributionComputation
 * @property {boolean} valid - true if the contribution is valid; otherwise false.
 * @property {number} verificationComputationTime - the time spent for completing the verification task only.
 * @property {number} verifyCloudFunctionTime - the time spent for the execution of the verify contribution cloud function.
 * @property {number} fullContributionTime - the time spent while contributing (from download to upload).
 */
export type VerifyContributionComputation = {
    valid: boolean
    verificationComputationTime: number
    verifyCloudFunctionTime: number
    fullContributionTime: number
}
