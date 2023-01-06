import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux'
import { getMovieRank } from "./slices/MovieRankSlice";

// 로딩바 컴포넌트
import Spinner from './components/Spinner';
// 에러정보를 표시하기 위한 컴포넌트
import ErrorView from './components/ErrorView';
// 그래프 표시르 위한 컴포넌트
import BarChartView from './components/BarChartView';
// 미디어쿼리
import mq from './MediaQuery';
// 날짜 처리 라이브러리
import dayjs from "dayjs";

const Container = styled.div`
    ${mq.minWidth('md')`
        display: flex;
        flex-direction : row;
        flex-wrap: nowrap;

        .flex-item {
            width: 50%;
            box-sizing: border-box;
            padding: 10px;
        }
    `}
`;

const App = memo(() => {
  const { data, loading, error} = useSelector((state) => state.MovieRankSlice);

  const dispatch = useDispatch();

  const [targetDt, setTargetDt] = useState(dayjs().add(-1, 'd').format('YYYY-MM-DD'));

  useEffect(() => {
    dispatch(getMovieRank({
      targetDt: targetDt.replaceAll('-', '')
    }));
  },[targetDt]);

  // 드롭다운 이벤트
  const onDataChange = useCallback((e) => {
    e.preventDefault();
    setTargetDt(e.target.value);
  },[]);

  // data가 변경되었을 때, 사이드 이펙트를 처리하여 그래프에 적용할 데이터를 생성한다.
  const { movieNm, audiCnt } = useMemo(() => {
    const newData = { movieNm: [], audiCnt: []};

    if (data) {
      data.boxOfficeResult.dailyBoxOfficeList.forEach((v, i) => {
        newData.movieNm.push(v.movieNm);
        newData.audiCnt.push(v.audiCnt);
      });

      console.log(newData);
    }

    return newData;
  },[data]);

  return (
    <div>
      <Spinner loading={loading} />

      <h1>영화진흥위원회 박스오피스 순위</h1>

      <form>
        <input type="date" className="form-control" placeholder="연도-월-일"  onChange={onDataChange}/>
      </form>

      {error? <ErrorView error={error} /> : (
            <Container>
                
                <div className="flex-item">
                    <table border='1'>
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>영화제목</th>
                                <th>관객수</th>
                                <th>개봉일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.boxOfficeResult.dailyBoxOfficeList.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{v.rank}</td>
                                        <td>{v.movieNm}</td>
                                        <td>{Number(v.audiCnt).toLocaleString()}</td>
                                        <td>{v.openDt}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex-item">
                    <BarChartView labels={movieNm} dataset={audiCnt} legend='관람객 수' />
                </div>
            </Container>
        )}
    </div>
  );
});

export default App;
