import React from 'react';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Typography } from '@mui/material';
import "../../assets/css/font.css";

const ChatMessageNotice = ({ notice }) => {
    return (
        <Divider style={{marginTop: "10px"}}>
            <Chip icon={<CampaignIcon/>} label={<Typography style={{fontFamily: "IBMPlexSansKR-Regular"}}>{notice}</Typography>} />
        </Divider>
    );
};

export default ChatMessageNotice;