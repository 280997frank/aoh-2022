import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || "", {
  cluster: "ap1",
});

export default pusher;
