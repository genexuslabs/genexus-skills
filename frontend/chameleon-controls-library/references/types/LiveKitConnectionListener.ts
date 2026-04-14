/** Auto-generated type declaration. Do not edit manually. */

export type LiveKitConnectionListener = {
  trackMuted?: (
    participant: Participant,
    publication: TrackPublication
  ) => void;
  trackUnmuted?: (
    participant: Participant,
    publication: TrackPublication
  ) => void;
  isSpeakingChanged?: (participant: Participant, speaking: boolean) => void;
  connectionQualityChanged?: (
    participant: Participant,
    connectionQuality: ConnectionQuality
  ) => void;
};
