/** Auto-generated type declaration. Do not edit manually. */

import type { LiveKitConnectionListener } from "./LiveKitConnectionListener";

export type LiveKitCallbacks = {
  /**
   * Active speakers changed. List of speakers are ordered by their audio level.
   * Loudest speakers first. This will include the LocalParticipant too.
   *
   * Speaker updates are sent only to the publishing participant and their subscribers.
   */
  activeSpeakersChanged?: (participant: Participant[]) => void;

  connectionEvents?: LiveKitConnectionListener;

  muteMic?: () => void;

  unmuteMic?: () => void;

  updateTranscriptions?: (
    segments: TranscriptionSegment[],
    participant?: Participant,
    publication?: TrackPublication
  ) => void;
};
