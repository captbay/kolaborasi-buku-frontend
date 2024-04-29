import Pusher from "pusher-js";
import { axios } from "../services";

export const pusher = (token: string, token_type: string) =>
  new Pusher("535231f4d169022dd692", {
    forceTLS: true,
    cluster: "ap1",
    authEndpoint: process.env.NEXT_PUBLIC_API_URL + "/broadcasting/auth",
    authorizer: (channel: any, _: any) => {
      return {
        authorize: (socketId: any, callback: any) => {
          axios
            .post(
              "/broadcasting/auth",
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                headers: {
                  Authorization: `${token_type} ${token}`,
                },
              }
            )
            .then((response) => {
              callback(null, response.data);
            })
            .catch((error) => {
              callback(error, null);
            });
        },
      };
    },
  });
