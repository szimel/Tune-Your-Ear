import React from "react";

//creates sound variabels for 
export const chordAudioSetup = {
  A: new Audio('/Major-Chords/a-major-chord.mp3'),
  'A#': new Audio('/Major-Chords/a-sharp-major-chord.mp3'),
  B: new Audio('/Major-Chords/b-major-chord.mp3'),
  C: new Audio('/Major-Chords/c-major-chord.mp3'),
  'C#': new Audio('/Major-Chords/c-sharp-major-chord.mp3'),
  D: new Audio('/Major-Chords/d-major-chord.mp3'),
  'D#': new Audio('/Major-Chords/d-sharp-major-chord.mp3'),
  E: new Audio('/Major-Chords/e-major-chord.mp3'),
  F: new Audio('/Major-Chords/f-major-chord.mp3'),
  "F#": new Audio('/Major-Chords/f-sharp-major-chord.mp3'),
  G: new Audio('/Major-Chords/g-major-chord.mp3'),
  "G#": new Audio('/Major-Chords/g-sharp-major-chord.mp3')
};

//classifies each chord with audio sounds - not needed until another octives is added

//creates sound variables for notes
const noteAudioSetup = {
  A1: new Audio('/notes/A-1.mp3'),
  A2: new Audio('/notes/A-2.mp3'),
  AS1: new Audio('/notes/AS-1.mp3'),
  AS2: new Audio('/notes/AS-2.mp3'),
  B1: new Audio('/notes/B-1.mp3'),
  B2: new Audio('/notes/B-2.mp3'),
  C1: new Audio('/notes/C-1.mp3'),
  C2: new Audio('/notes/C-2.mp3'),
  CS1: new Audio('/notes/CS-1.mp3'),
  CS2: new Audio('/notes/CS-2.mp3'),
  D1: new Audio('/notes/D-1.mp3'),
  D2: new Audio('/notes/D-2.mp3'),
  DS1: new Audio('/notes/DS-1.mp3'),
  DS2: new Audio('/notes/DS-2.mp3'),
  E1: new Audio('/notes/E-1.mp3'),
  E2: new Audio('/notes/E-2.mp3'),
  F1: new Audio('/notes/F-1.mp3'),
  F2: new Audio('/notes/F-2.mp3'),
  FS1: new Audio('/notes/FS-1.mp3'),
  FS2: new Audio('/notes/FS-2.mp3'),
  G1: new Audio('/notes/G-1.mp3'),
  G2: new Audio('/notes/G-2.mp3'),
  GS1: new Audio('/notes/GS-1.mp3'),
  GS2: new Audio('/notes/GS-2.mp3')
}

//classifies each note with audio sounds
export const noteSetup = {
  C: [noteAudioSetup.C1, noteAudioSetup.C2],
  'C#': [noteAudioSetup.CS1, noteAudioSetup.CS2],
  D: [noteAudioSetup.D1, noteAudioSetup.D2],
  'D#': [noteAudioSetup.DS1, noteAudioSetup.DS2],
  E: [noteAudioSetup.E1, noteAudioSetup.E2],
  F: [noteAudioSetup.F1, noteAudioSetup.F2],
  'F#': [noteAudioSetup.FS1, noteAudioSetup.FS2],
  G: [noteAudioSetup.G1, noteAudioSetup.G2],
  'G#': [noteAudioSetup.GS1, noteAudioSetup.GS2],
  A: [noteAudioSetup.A1, noteAudioSetup.A2],
  'A#': [noteAudioSetup.AS1, noteAudioSetup.AS2],
  B: [noteAudioSetup.B1, noteAudioSetup.B2]
};


//puts into simple form for function
// export const audio = [
//   noteAudioSetup.A1,
//   noteAudioSetup.A2,
//   noteAudioSetup.AS1,
//   noteAudioSetup.AS2,
//   noteAudioSetup.B1,
//   noteAudioSetup.B2,
//   noteAudioSetup.C1,
//   noteAudioSetup.C2,
//   noteAudioSetup.CS1,
//   noteAudioSetup.CS2,
//   noteAudioSetup.D1,
//   noteAudioSetup.D2,
//   noteAudioSetup.DS1,
//   noteAudioSetup.DS2,
//   noteAudioSetup.E1,
//   noteAudioSetup.E2,
//   noteAudioSetup.F1,
//   noteAudioSetup.F2,
//   noteAudioSetup.FS1,
//   noteAudioSetup.FS2,
//   noteAudioSetup.G1,
//   noteAudioSetup.G2,
//   noteAudioSetup.GS1,
//   noteAudioSetup.GS2
// ];


//creates ref for UI piano
export const refContainer = {
  C: React.createRef(),
  CS: React.createRef(),
  D: React.createRef(),
  DS: React.createRef(),
  E: React.createRef(),
  F: React.createRef(),
  FS: React.createRef(),
  G: React.createRef(),
  GS: React.createRef(),
  A: React.createRef(),
  AS: React.createRef(),
  B: React.createRef(),
};
