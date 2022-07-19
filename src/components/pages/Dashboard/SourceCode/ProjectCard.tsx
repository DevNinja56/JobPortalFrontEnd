import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

export type ProjectCardRepoType = {
  repoName: string;
  repoUrls: string;
  repoDesc: string;
  ownerImage: string;
  ownerName: string;
  ownerUrl: string;
  repoLanguage: string;
};

const ProjectCard = ({
  ownerImage = "",
  ownerName = "",
  ownerUrl = "",
  repoDesc = "",
  repoLanguage = "",
  repoName = "",
  repoUrls = "",
}: ProjectCardRepoType) => {
  return (
    <Card className="repoCard">
      <CardHeader
        avatar={
          <Avatar
            src={ownerImage}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {ownerName.split("")[0]}
          </Avatar>
        }
        title={ownerName}
      // subheader="June 10, 2022"
      />
      <CardContent>
        <h1 className="repoName text-center font-weight-bold my-3">
          {repoName}
        </h1>
        <Typography variant="body2" color="text.secondary">
          {repoDesc}
        </Typography>
        <div className="button-container">
          <a
            rel="noreferrer"
            href={`${repoUrls}`}
            className="btn-own"
            target={"_blank"}
            download
          >
            View
          </a>

          <a
            rel="noreferrer"
            href={`${repoUrls}/archive/refs/heads/main.zip`}
            className="btn-own-outline"
            download
          >
            Download
          </a>
        </div>
        {/* <div className="language-tech">
                    <div className="w-100 text-dark">Technology:</div>
                    <div className="tags">
                        <div className="tag">Html</div>
                        <div className="tag">css</div>
                        <div className="tag">Javascript</div>
                        <div className="tag">php</div>
                        <div className="tag">React</div>
                        <div className="tag">Laravel</div>
                    </div>
                </div> */}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
