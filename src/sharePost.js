import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import GoalUpdate from "./goalUpdate";
import NewJoinee from "./newJoinee";
import Promotion from "./promotion";
import ViewPost from "./post";
import ViewEvent from "./event";
import SingleAnniversary from "./anniversary";
import SingleBirthday from "./birthday";
import Header from "../partials/header";
import Reactions from "../partials/reactions";

const SharePosts = () => {
    const [sharePost, setSharePost] = useState([]);
    const { activity_id } = useParams();

    const authstatus = useSelector((state) => state.auth);
    const feed_group = authstatus.feed_group.toString();
    const feed_id = authstatus.feed_id.toString();

    useEffect(() => {
        axios
            .post("/api/v1/getStream/getActivity", {
                feed_group: feed_group,
                feed_name: feed_id,
                activity_id: activity_id,
            })
            .then((response) => {
                setSharePost(response.data.data[0]);
            });
    }, [activity_id]);
    return (
        <Grid container spacing={2} mt={5}>
            <Grid lg={7} md={7} sm={7} xs={12} pl={6}>
                {/* <Header data={sharePost} /> */}
                {
                    {
                        anniversary: <SingleAnniversary data={sharePost} />,
                        bday: <SingleBirthday data={sharePost} />,
                        promotion: <Promotion data={sharePost} />,
                        joining: <NewJoinee data={sharePost} />,
                        goal: <GoalUpdate data={sharePost} />,
                        post: <ViewPost data={sharePost} />,
                        event: <ViewEvent data={sharePost} />,
                    }[sharePost.event_type]
                }
                {/* <Reactions data={sharePost} /> */}
            </Grid>
            <Grid lg={3} md={3} sm={3} xs={12}></Grid>
        </Grid>
    );
};

export default SharePosts;
