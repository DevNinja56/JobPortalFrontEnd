import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ProjectCard, { ProjectCardRepoType } from "./ProjectCard";
import { useDispatch } from "react-redux";
import { changeHeading } from "../../../../features/HeaderHeading/HeaderHeadingSlice";
import DashboardLayout from "../../../layout/DashboardLayout";

type Props = {};

type RepoInfoType = {
  repoName: string;
  repoUrls: string;
  repoDesc: string;
  ownerImage: string;
  ownerName: string;
  ownerUrl: string;
  repoLanguage: string;
};

const SourceCode = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHeading('Source Code'));
  }, []);

  const dummyData: ProjectCardRepoType[] = [
    {
      repoName: 'JobGenie-Extension',
      repoUrls: 'https://github.com/JobGenie/JobGenie-Extension',
      repoDesc: '',
      ownerImage: 'https://avatars.githubusercontent.com/u/73527767?v=4',
      ownerName: 'JobGenie',
      ownerUrl: '',
      repoLanguage: '',
    },
    {
      repoName: 'JobGenie_ResumeScan',
      repoUrls: 'https://github.com/JobGenie/JobGenie_ResumeScan',
      repoDesc: '',
      ownerImage: 'https://avatars.githubusercontent.com/u/73527767?v=4',
      ownerName: 'JobGenie',
      ownerUrl: '',
      repoLanguage: '',
    },
  ]

  return (
    <DashboardLayout>
      <Grid
        spacing={2}
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
      >
        {dummyData && dummyData.map((repo, key) => {
          return (
            <>
              <Grid item md={4} sm={6} xs={12}>
                <ProjectCard {...repo} key={key} />
              </Grid>
            </>
          )
        })}
      </Grid>
    </DashboardLayout>
  );
};

export default SourceCode;
