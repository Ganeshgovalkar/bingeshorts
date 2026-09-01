export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "continue-watching",
    title: "After 9 PM is waiting.",
    message: "You stopped at Episode 4 with only 3 minutes left.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=300&auto=format&fit=crop",
    createdAt: "2h ago",
    group: "Today",
    isRead: false,
    action: {
      type: "resume",
      dramaId: "after-9-pm",
      episodeId: 4
    }
  },
  {
    id: "notif-2",
    type: "new-episode",
    title: "A new episode just dropped.",
    message: "Room 404 • Episode 6 is ready.",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=300&auto=format&fit=crop",
    createdAt: "4h ago",
    group: "Today",
    isRead: false,
    action: {
      type: "drama",
      dramaId: "room-404",
      episodeId: 6
    }
  },
  {
    id: "notif-3",
    type: "actor",
    title: "Lena Park is back.",
    message: "She's starring in Two Stops Away on BingeShorts.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    createdAt: "1d ago",
    group: "Earlier",
    isRead: true,
    action: {
      type: "actor",
      actorId: "lena-park"
    }
  },
  {
    id: "notif-4",
    type: "new-original",
    title: "New obsession unlocked.",
    message: "The Last Seen is now streaming.",
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=300&auto=format&fit=crop",
    createdAt: "2d ago",
    group: "Earlier",
    isRead: true,
    action: {
      type: "drama",
      dramaId: "the-last-seen"
    }
  },
  {
    id: "notif-5",
    type: "creator",
    title: "Jordan Lee has a new story.",
    message: "The first episode of Almost Married is ready to watch.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    createdAt: "3d ago",
    group: "Older",
    isRead: true,
    action: {
      type: "creator",
      creatorId: "jordan-lee"
    }
  },
  {
    id: "notif-6",
    type: "trending",
    title: "Everyone is talking about this. 🔥",
    message: "Room 404 is trending right now.",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=300&auto=format&fit=crop",
    createdAt: "4d ago",
    group: "Older",
    isRead: true,
    action: {
      type: "drama",
      dramaId: "room-404"
    }
  }
];
