// import React, { useState, useEffect } from "react";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Badge from "@mui/material/Badge";
// import Avatar from "@mui/material/Avatar";
// import { deepPurple } from "@mui/material/colors";
// import { border } from "@mui/system";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Divider from "@mui/material/Divider";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import CommentIcon from "@mui/icons-material/Comment";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import EventIcon from "@mui/icons-material/Event";
// import { useSelector } from "react-redux";

// const SmallAvatar = styled(Avatar)(({ theme }) => ({
//     width: 30,
//     height: 30,
//     border: `2px solid ${theme.palette.background.paper}`,
//     backgroundColor: "#cfd8dc",
// }));

// export default function NotificationFeed() {
//     const [feedData, setFeedData] = useState([]);
//     const [value, setValue] = useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     useEffect(() => {
//         accessFeedData();
//     }, []);

//     const provideAuth = useSelector((state) => state.auth);
//     const accessFeedData = () => {
//         var data = JSON.stringify({
//             feed_group: "tangohr_noti",
//             feed_name: provideAuth.feed_id,
//         });

//         axios
//             .post("api/v1/notificationFeed", data, {
//                 headers: { "Content-Type": "application/json" },
//             })
//             .then(function (response) {
//                 setFeedData(response.data.data);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };

//     const feedDataHandler = (activityCount, activities, verb) => {
//         function showData(activity, activityCount) {
//             const storeLatestData = activity.slice(Math.max(activity.length - 3, 0));
//             return storeLatestData.map((data, i) => {
//                 return (
//                     <span key={data.id}>
//                         {data.full_name}
//                         {i < storeLatestData.length - 1
//                             ? ", "
//                             : ` and ${activity.length - 3} other ${messageHandler(verb, activityCount)}`}
//                     </span>
//                 );
//             });
//         }
//         return (
//             <div>
//                 <Box
//                     sx={{
//                         height: 70,
//                         display: "flex",
//                     }}>
//                     <Badge
//                         sx={{ margin: 2 }}
//                         overlap="circular"
//                         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                         badgeContent={<SmallAvatar>{iconHandler(verb)}</SmallAvatar>}>
//                         <Avatar sx={{ bgcolor: "#424242", height: 40 }} />
//                     </Badge>
//                     <Box
//                         sx={{
//                             marginTop: "20px",
//                         }}>
//                         {activityCount > 3
//                             ? showData(activities)
//                             : activities.map((data, i) => {
//                                   if (activities.length == 2) {
//                                       return (
//                                           <span>
//                                               {data.full_name}
//                                               {i < activities.length - 1
//                                                   ? " and "
//                                                   : ` ${messageHandler(verb, activityCount)}`}
//                                           </span>
//                                       );
//                                   } else if (activities.length == 3) {
//                                       return (
//                                           <span>
//                                               {data.full_name}
//                                               {i < activities.length - 1
//                                                   ? ", "
//                                                   : `${messageHandler(verb, activityCount)}`}
//                                           </span>
//                                       );
//                                   } else if (activities.length == 1) {
//                                       return (
//                                           <span>
//                                               {data.full_name} {messageHandler(verb, activityCount)}
//                                           </span>
//                                       );
//                                   }
//                               })}
//                     </Box>
//                 </Box>
//                 <Divider />
//             </div>
//         );
//     };
//     function TabPanel(props) {
//         const { children, value, index, ...other } = props;

//         return (
//             <div
//                 role="tabpanel"
//                 hidden={value !== index}
//                 id={`simple-tabpanel-${index}`}
//                 aria-labelledby={`simple-tab-${index}`}
//                 {...other}>
//                 {value === index && (
//                     <Box sx={{ p: 1 }}>
//                         <Typography>{children}</Typography>
//                     </Box>
//                 )}
//             </div>
//         );
//     }
//     TabPanel.propTypes = {
//         children: PropTypes.node,
//         index: PropTypes.number.isRequired,
//         value: PropTypes.number.isRequired,
//     };

//     function a11yProps(index) {
//         return {
//             id: `simple-tab-${index}`,
//             "aria-controls": `simple-tabpanel-${index}`,
//         };
//     }
//     const iconHandler = (icon) => {
//         return icon == "like" ? (
//             <ThumbUpIcon sx={{ color: "blue", height: 20 }} />
//         ) : icon == "comment" ? (
//             <CommentIcon sx={{ color: "green", height: 20 }} />
//         ) : icon == "user_post" ? (
//             <PostAddIcon sx={{ color: "#880e4f", height: 20 }} />
//         ) : (
//             <EventIcon sx={{ color: "orange", height: 20 }} />
//         );
//     };

//     function messageHandler(notificationType, Count) {
//         if (notificationType == "like") {
//             return Count == 1 ? " has liked your post." : " have liked your post.";
//         } else if (notificationType == "comment") {
//             return Count == 1 ? " has commented on your post." : " have commented on your post.";
//         } else if (notificationType == "event") {
//             return Count == 1 ? " has added an new event." : " have added an new event.";
//         } else if (notificationType == "user_post") {
//             return Count == 1 ? " has added a new post." : " have added a new post.";
//         } else if (notificationType == "yes") {
//             return Count == 1 ? " is Attending your event." : " are Attending your event.";
//         } else if (notificationType == "no") {
//             return Count == 1 ? " is not Interested in your event." : " are not Interested in your event.";
//         } else if (notificationType == "maybe") {
//             return Count == 1 ? " is Interested in your event." : " are Interested in your event.";
//         }
//     }

//     return (
//         <div>
//             <Box
//                 sx={{
//                     margin: 2,
//                 }}>
//                 <Typography
//                     variant="h5"
//                     color="initial"
//                     sx={{ fontWeight: "bold", letterSpacing: "-1 px", fontFamily: "arial" }}>
//                     Notifications
//                 </Typography>
//                 <Box sx={{ width: "100%" }}>
//                     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                             <Tab label="All" {...a11yProps(0)} />
//                             <Tab label="Unread" {...a11yProps(1)} />
//                         </Tabs>
//                     </Box>
//                     <TabPanel value={value} index={0}>
//                         {feedData.length > 0 &&
//                             feedData.map((data) => feedDataHandler(data.activity_count, data.activities, data.verb))
//                         }
                        
//                     </TabPanel>
//                     <TabPanel value={value} index={1}>
//                         Item Two
//                     </TabPanel>
//                 </Box>
//             </Box>
//         </div>
//     );
// }
