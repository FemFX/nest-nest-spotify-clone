import { useState } from "react";
import axios from "axios";
import { Button, Grid, TextField } from "@material-ui/core";
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import { ITrack } from "../../types/track";
import { GetServerSideProps } from "next";
import { useInput } from "../../hooks/useInput";

const TrackPage: React.FC = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const username = useInput("");
  const text = useInput("");
  const addComment = async () => {
    const { data } = await axios.post("http://localhost:5000/track/comment", {
      username: username.value,
      text: text.value,
      trackId: track._id,
    });
    setTrack({ ...track, comments: [...track.comments, data] });
  };
  return (
    <MainLayout title={track.name}>
      <Link href={"/tracks"}>
        <a>К списку</a>
      </Link>
      <Grid container style={{ margin: "20px 0" }}>
        <img
          src={"http://localhost:5000/" + track.picture}
          alt={track.name}
          width={200}
          height={200}
        />
        <div>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний {track.listens}</h1>
        </div>
      </Grid>
      <h1>Текст трека</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container>
        <TextField {...username} label="Ваше имя" fullWidth />
        <TextField {...text} label="Комментарий" fullWidth multiline rows={4} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div key={comment._id}>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`http://localhost:5000/track/${params.id}`);
  return {
    props: {
      serverTrack: data,
    },
  };
};
