import React from 'react';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
const ChatMessageNotice = ({ notice }) => {
    return (
        <Divider>
            <Chip icon={<MarkUnreadChatAltIcon/>} label={notice} />
        </Divider>
    );
};

export default ChatMessageNotice;