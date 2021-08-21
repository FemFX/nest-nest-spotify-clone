import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Card, Grid, Box, TextField } from "@material-ui/core";
import Link from "next/link";
import TrackList from "../../components/TrackList";
import { useRouter } from "next/router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions-creators/tracks";
import { useDispatch } from "react-redux";

const Tracks = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, tracks } = useTypedSelector((state) => state.track);

  const search = async (e) => {
    if (e.key === "Enter") {
      await dispatch(await searchTracks(query));
    }
  };
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout title="Все треки">
      <Grid container justifyContent="center">
        <Card style={{ width: "900px" }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Link href={"/tracks/create"}>
                <a>Загрузить</a>
              </Link>
            </Grid>
          </Box>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}
            fullWidth
          />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
  }
);
