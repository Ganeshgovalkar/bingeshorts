export const ACTORS = [
  {
    id: "lena-park",
    name: "Lena Park",
    slug: "lena-park",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    location: "London",
    bio: "Lena is known for emotionally charged performances and characters who always seem to be hiding something.",
    currentRole: "Maya in After 9 PM",
    roles: [
      {
        dramaId: "after-9-pm",
        characterName: "Maya Chen",
        description: "Always knows when to leave—except this time."
      },
      {
        dramaId: "two-stops-away",
        characterName: "June",
        description: "A daily commuter who notices everything."
      }
    ],
    featuredDramaIds: ["after-9-pm", "two-stops-away"],
    fanReactions: [
      { user: "@midnightmila", text: "Lena's acting in Episode 4 destroyed me.", likes: "8.2K" },
      { user: "@after9pmfan", text: "Every look. Every pause. She's unreal.", likes: "4.1K" }
    ]
  },
  {
    id: "noah-brooks",
    name: "Noah Brooks",
    slug: "noah-brooks",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    location: "Seoul",
    bio: "Noah is known for characters who make bad decisions for very good reasons.",
    currentRole: "Eli in After 9 PM",
    roles: [
      {
        dramaId: "after-9-pm",
        characterName: "Eli Carter",
        description: "Says he doesn't believe in coincidences."
      },
      {
        dramaId: "the-last-seen",
        characterName: "Noah",
        description: "Determined to uncover the truth."
      }
    ],
    featuredDramaIds: ["after-9-pm", "the-last-seen"],
    fanReactions: [
      { user: "@jaywrites", text: "Noah's delivery in the train station scene was perfection.", likes: "5.4K" }
    ]
  },
  {
    id: "ava-mitchell",
    name: "Ava Mitchell",
    slug: "ava-mitchell",
    portrait: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    location: "New York",
    bio: "Ava brings sharp humor and emotional unpredictability to every role.",
    currentRole: "Sofia in After 9 PM",
    roles: [
      {
        dramaId: "after-9-pm",
        characterName: "Sofia Reed",
        description: "She knows more about the station than anyone should."
      },
      {
        dramaId: "almost-married",
        characterName: "Claire",
        description: "The fake fiancee with real feelings."
      }
    ],
    featuredDramaIds: ["after-9-pm", "almost-married"],
    fanReactions: [
      { user: "@sophieoffline", text: "Ava steals every single scene she is in!", likes: "6.8K" }
    ]
  },
  {
    id: "sarah-lin",
    name: "Sarah Lin",
    slug: "sarah-lin",
    portrait: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    location: "Toronto",
    bio: "Sarah excels in dark, psychological mystery dramas.",
    currentRole: "Nina in Room 404",
    roles: [
      {
        dramaId: "room-404",
        characterName: "Nina",
        description: "Just needed a summer job."
      }
    ],
    featuredDramaIds: ["room-404"],
    fanReactions: [
      { user: "@thrillerlover", text: "Sarah's fear in Room 404 feels so real.", likes: "3.2K" }
    ]
  }
];

export const CREATORS = [
  {
    id: "jordan-lee",
    name: "Jordan Lee",
    slug: "jordan-lee",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    roles: ["Creator", "Writer"],
    bio: "Jordan creates emotionally tense stories about timing, silence, and the decisions that happen after midnight.",
    creativeNote: "The best stories start when people decide not to go home.",
    dramaIds: ["after-9-pm", "the-last-seen", "almost-married"],
    featuredOriginalId: "after-9-pm"
  },
  {
    id: "riley-morgan",
    name: "Riley Morgan",
    slug: "riley-morgan",
    portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    roles: ["Creator", "Director"],
    bio: "Riley creates fast, character-driven stories where every episode ends with a reason to stay.",
    creativeNote: "A cliffhanger is a promise that the next minute matters.",
    dramaIds: ["room-404", "72-hours"],
    featuredOriginalId: "room-404"
  }
];
