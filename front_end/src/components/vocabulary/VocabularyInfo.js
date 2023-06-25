import React, { useState, useEffect } from 'react';
import { fetchMaziiData } from '../../api/mazii.js';
import { fetchKanjiData } from '../../api/kanji.js';
import { Image, List, Row, Col, Table, Typography, Button } from 'antd';
import '../../assets/styles/vocabulary/VocabularyInfo.css';
import ReactPlayer from 'react-player';
import { useRef } from 'react';
import Grid from '@mui/material/Grid';

const VocabularyInfo = ({ kanji }) => {
  const { Paragraph } = Typography;
  const [data, setData] = useState(null);
  const [dataMazzi, setDataMazzi] = useState(null);
  const playerRef = useRef(null);
  const [replay, setReplay] = useState(false);
  const [isDataNotFound, setIsDataNotFound] = useState(false);

  const handleReplay = () => {
    setReplay(true);
    playerRef.current.seekTo(0);
    playerRef.current.getInternalPlayer().play();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchKanjiData(kanji);
        console.log(result);
        setData(result);
        if (result && result.error === 'No kanji found.') {
          setIsDataNotFound(true);
        } else {
          setIsDataNotFound(false);
        }
      }
      catch (error) {
        console.error('Error fetching Kanji data:', error);
        setIsDataNotFound(true);
      }
    };
    const fetchDataMazzi = async () => {
      try {
        const response = await fetchMaziiData(kanji);
        console.log(response.results[0]);
        setDataMazzi(response.results[0]);

      } catch (error) {
        console.error('Error fetching Kanji data:', error);

      }
    };

    fetchDataMazzi();
    fetchData();
  }, [kanji]);
  if (isDataNotFound) {
    return (
      <div className="VocabularyInfo__contain">
        <Paragraph style={{ color: 'red' }} >Không tìm thấy kết quả</Paragraph>
      </div>
    );
  }
  return (
    <div className="VocabularyInfo__contain">
      <div className="VocabularyInfo__contain__info">
        <div className="VocabularyInfo__contain__kanji">
          <div className="VocabularyInfo__contain__kanji__title">
            <Typography variant="body1" component="div">
              Hán tự: <span style={{ color: 'red' }}>{dataMazzi?.kanji}</span> - {dataMazzi?.mean}
            </Typography>
          </div>
          <div className="VocabularyInfo__contain__kanji__kun">
            <Paragraph>Kunyomi: {dataMazzi?.kun}</Paragraph>
          </div>
          <div className="VocabularyInfo__contain__kanji__on">
            <Paragraph>Onyomi: {dataMazzi?.on}</Paragraph>
          </div>
          <div className="VocabularyInfo__contain__kanji__stroke-count">
            <Paragraph>Số nét: {dataMazzi?.stroke_count}</Paragraph>
          </div>
          <div className="VocabularyInfo__contain__kanji__level">
            <Paragraph>JLPT: {dataMazzi?.level}</Paragraph>
          </div>
          <div className="VocabularyInfo__contain__kanji__Detail">
            <Paragraph>Bộ: {dataMazzi?.compDetail?.map((item) => (
              <span>
                {' '}
                {item.w} - {item.h}
              </span>
            ))}</Paragraph>
          </div>
          <div className="VocabularyInfo__contain__kanji__mean">
            <Paragraph>Nghĩa: {dataMazzi?.detail}</Paragraph>
          </div>
        </div>


        <div className='VocabularyInfo__contain__video'>
          <ReactPlayer
            ref={playerRef}
            width="100%"
            loop={false}
            playing={!replay}
            muted={true}
            height="100%"
            controls={false}
            url={data?.kanji?.video?.mp4}
          />
          <Button className="VocabularyInfo__contain__video_replay" type="primary" onClick={handleReplay}>Vẽ lại</Button>

        </div>
      </div>

      <div className="VocabularyInfo__contain__example">
        <Paragraph > <span style={{fontWeight:'bold'}}>Ví dụ:</span> {dataMazzi?.examples?.map((example, index) => (
          <div key={index}>
            <Row key={index} gutter={16}>
              <Col span={6}>
                <p>{example.p}</p>
              </Col>
              <Col span={6}>
                <p>{example.w}</p>
              </Col>
              <Col span={6}>
                <p>{example.h}</p>
              </Col>
              <Col span={6}>
                <p>{example.m}</p>
              </Col>
            </Row>
          </div>
        ))}
        </Paragraph>
      </div>
    </div>
  );
};

export default VocabularyInfo;
