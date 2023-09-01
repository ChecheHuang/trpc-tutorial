import { client } from "./client";
import { useEffect } from "react";

const subscribe = () => {
  const connection = client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log("Updated", id);
    },
  });
  // wsClient.close();
};

function Client() {
  useEffect(() => {
    subscribe();
  }, []);
  return (
    <>
      <div>
        WebSocket
        <br />
        <button
          onClick={() => {
            client.users.update.mutate({ userId: "1", name: "Test" });
          }}
        >
          update
        </button>
      </div>
      <div>
        Not WebSocket
        <div>
          <button
            onClick={async () => {
              const users = await client.users.get.query({ userId: "1" });
              console.log(users);
            }}
          >
            getUser
          </button>
          <button
            onClick={async () => {
              const users = await client.users.update.mutate({
                userId: "1",
                name: "Test",
              });
              console.log(users);
            }}
          >
            updateUser
          </button>
          <button
            onClick={async () => {
              const secretData = await client.secretData.query();
              console.log(secretData);
            }}
          >
            secretData
          </button>
        </div>
      </div>
    </>
  );
}

export default Client;
