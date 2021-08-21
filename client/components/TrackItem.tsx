import { Card, Grid, IconButton } from "@material-ui/core";
import { Pause, PlayArrow } from "@material-ui/icons";
import { ITrack } from "../types/track";
import { useRouter } from "next/router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import styles from "../styles/TrackItem.module.scss";

interface ITrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<ITrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };
  return (
    <Card
      className={styles.track}
      onClick={() => router.push(`/tracks/${track._id}`)}
    >
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img
        src={"http://localhost:5000/" + track.picture}
        alt={track.name}
        width={70}
        height={70}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
        {active && <div>2:42/3:12</div>}
      </Grid>
    </Card>
  );
};

export default TrackItem;
