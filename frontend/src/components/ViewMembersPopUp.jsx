import { Crown } from "lucide-react";
import { Button } from "../components/Button";

export function ViewMembersPopUp({
  onConfirm,
  leader,
  member = [],
  onlineList = [],
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white p-8 shadow-card relative flex flex-col space-y-4 rounded-3xl w-[30%] min-w-[450px] min-h-[250px] max-w-[1200px] justify-center items-center">
        {/* Header */}
        <p className="text-h2 font-semibold text-black text-center">Members</p>

        {/* Member List */}
        <div className="w-full flex flex-col gap-4 max-h-[300px] overflow-y-auto px-4">
          {member.map((username, index) => {
            const onlineUser = onlineList.find((u) => u?.username === username);
            const avatarId = onlineUser ? onlineUser.avatarId : 0;
            const isOnline = Boolean(onlineUser);

            return (
              <div key={username || index} className="flex items-center gap-4">
                <img
                  src={`/profile${avatarId}.svg`}
                  alt="avatar"
                  className={`w-12 h-12 rounded-full object-cover bg-blue ${
                    !isOnline ? "opacity-50 grayscale" : ""
                  }`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/profile0.svg";
                  }}
                />
                <div className="flex items-center gap-2">
                  <p className="text-body font-medium text-black">{username}</p>

                  {/* show crown for leader */}
                  {username === leader && (
                    <Crown
                      size={20}
                      className="fill-primary-yellow text-black stroke-[1.5]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <Button color="blue" className="font-medium" onClick={onConfirm}>
          Close
        </Button>
      </div>
    </div>
  );
}
