import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/miscellaneous/ChatBox";
import MyChats from "../components/miscellaneous/MyChat";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SlideDrawer";
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%", background: "gray" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
