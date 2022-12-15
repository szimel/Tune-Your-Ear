import React from "react";

//creates sound variables
const audioSetup = {
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
  C: [audioSetup.C1, audioSetup.C2],
  CS: [audioSetup.CS1, audioSetup.CS2],
  D: [audioSetup.D1, audioSetup.D2],
  DS: [audioSetup.DS1, audioSetup.DS2],
  E: [audioSetup.E1, audioSetup.E2],
  F: [audioSetup.F1, audioSetup.F2],
  FS: [audioSetup.FS1, audioSetup.FS2],
  G: [audioSetup.G1, audioSetup.G2],
  GS: [audioSetup.GS1, audioSetup.GS2],
  A: [audioSetup.A1, audioSetup.A2],
  AS: [audioSetup.AS1, audioSetup.AS2],
  B: [audioSetup.B1, audioSetup.B2]
};


let C, CS, D, DS

export const noteArray = [
  C = noteSetup.C, CS = noteSetup.CS, D = noteSetup.D, DS = noteSetup.DS, noteSetup.E, noteSetup.F, noteSetup.FS, noteSetup.G, noteSetup.GS, noteSetup.A, noteSetup.AS, noteSetup.B
];


//puts into simple form for function
export const audio = [
  audioSetup.A1,
  audioSetup.A2,
  audioSetup.AS1,
  audioSetup.AS2,
  audioSetup.B1,
  audioSetup.B2,
  audioSetup.C1,
  audioSetup.C2,
  audioSetup.CS1,
  audioSetup.CS2,
  audioSetup.D1,
  audioSetup.D2,
  audioSetup.DS1,
  audioSetup.DS2,
  audioSetup.E1,
  audioSetup.E2,
  audioSetup.F1,
  audioSetup.F2,
  audioSetup.FS1,
  audioSetup.FS2,
  audioSetup.G1,
  audioSetup.G2,
  audioSetup.GS1,
  audioSetup.GS2
]


//can plug in same random number to find which note was chosen
export const decode = [
  'A', 'A', 'A#', 'A#', 'B', 'B', 'C', 'C', 'C#', 'C#', 'D', 'D', 'D#', 'D#', 'E', 'E', 'F', 'F', 'F#', 'F#', 'G', 'G', 'G#', 'G#'
];


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
