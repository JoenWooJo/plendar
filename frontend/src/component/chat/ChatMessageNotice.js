import React from 'react';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CampaignIcon from '@mui/icons-material/Campaign';

const ChatMessageNotice = ({ notice }) => {
    return (
        <Divider style={{marginTop: "10px"}}>
            <Chip icon={<CampaignIcon/>} label={notice} />
        </Divider>
    );
};

export default ChatMessageNotice;