import admin from "firebase-admin"

export enum CeremonyState {
  SCHEDULED = 1,
  OPENED = 2,
  PAUSED = 3,
  CLOSED = 4
}

export enum ParticipantStatus {
  CREATED = 1,
  WAITING = 2,
  READY = 3,
  CONTRIBUTING = 4,
  CONTRIBUTED = 5,
  OTHER = 6
}

export type WaitingQueue = {
  contributors: Array<string>
  currentContributor: string
  lastContributor: string
  nextContributor: string
  completedContributions: number // == nextZkeyIndex.
  waitingContributors: number
  failedContributions: number
  lastUpdated: admin.firestore.Timestamp
}

export type Ceremony = {
  title: string
  description: string
  startDate: admin.firestore.Timestamp
  endDate: admin.firestore.Timestamp
  prefix: string
  state: CeremonyState
  type: CeremonyType
  coordinatorId: string
  lastUpdate?: admin.firestore.FieldValue
}

export enum CeremonyType {
  PHASE1 = 1,
  PHASE2 = 2
}
