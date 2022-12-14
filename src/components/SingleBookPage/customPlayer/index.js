// https://github.com/lhz516/react-h5-audio-player#readme
// https://www.bensound.com/
// import './styles.css'
import React, { useState, useRef, useMemo } from 'react'
import { useEffect } from 'react'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './player.css'

export default function Player({ musicTracks }) {
  const [trackIndex, setTrackIndex] = useState(0)
  const playerRef = useRef()

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    )
    setChangeSpped(1)
  }

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    )

    setChangeSpped(1)
  }
  const [changeSpped, setChangeSpped] = useState(1)

  const changeSppedhandler = (event) => {
    setChangeSpped(event.target.value)
  }
  useEffect(() => {
    playerRef.current.audio.current.playbackRate = changeSpped
    setChangeSpped(changeSpped)
  }, [changeSpped])

  return (
    <div className="playerContainer">
      <AudioPlayer
        // style={{ width: "300px" }}
        // style={{ borderRadius: '1rem' }}
        // autoPlay
        // layout="horizontal"
        src={musicTracks[trackIndex].src}
        onPlay={(e) => console.log('onPlay')}
        showSkipControls={true}
        showJumpControls={false}
        header={`Now playing: ${musicTracks[trackIndex].name}`}
        // footer="All music from: www.bensound.com"
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          <div>/</div>,
          RHAP_UI.DURATION,
        ]}
        // onSpeedChange={speedChange}

        // customProgressBarSection={customProgressBarSection}
        // other props here

        ref={playerRef}
      />
      <div className="playerContainer-content">
        <div className="playerContainer-content-count">
          {/* <p>Total Count: </p> */}
        </div>
        <div className="playerContainer-content-select">
          <label for="cars">Change Speed:</label>

          <select onChange={changeSppedhandler} value={changeSpped}>
            <option value={'0.75'}>0.75</option>
            <option value={'0.5'}>0.5</option>
            <option value={'1'}>1</option>
            <option value={'1.25'}>1.25</option>
            <option value={'1.5'}>1.5</option>
            <option value={'2'}>2</option>
          </select>
        </div>
      </div>
    </div>
  )
}
