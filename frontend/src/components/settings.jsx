import { useState } from "react";
import Axios from "axios";

export const UserSettings = ({
  user,
  setCurrentPfp,
  handleSaveUsername,
  handleEditUsername,
  isEditingUsername,
  newUsername,
  setNewUsername,
}) => {
  const [availablePfps] = useState([
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2544.png",
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201939.png",
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201935.png",
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201962.png",
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201952.png",
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/893.png",
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png",
  ]);

  const handlePfpSelection = (pfpUrl) => {
    setCurrentPfp(pfpUrl);

    Axios.put("http://localhost:4000/users/updateUserPfp", {
      key: user.key,
      newPfp: pfpUrl,
    })
  };

  return (
    <div>
      <h3 className="text-3xl">Settings</h3>
      <div className="container grid grid-cols-2 gap-3 mx-auto mt-6">
        <div className="col-span-2">
          <h5 className="text-xl">Update Profile Picture</h5>
        </div>
        <div className="grid gap-4 grid-cols-6">
          {availablePfps.map((pfpUrl, index) => (
            <div
              key={index}
              className="w-full rounded cursor-pointer"
              onClick={() => handlePfpSelection(pfpUrl)}
            >
              <img src={pfpUrl} alt="Profile Picture" width={120} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <h5 className="text-xl">Edit Your Username</h5>
        {isEditingUsername ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={handleSaveUsername}>Save</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="text-xl">{user.username}</div>
            <button onClick={handleEditUsername}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};
