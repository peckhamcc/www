/* eslint-disable */
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  PageWrapper,
  Panel,
  LinkPanel,
  ResultTable,
  ResultHeader,
  ResultRow,
  ResultOddRow,
  ResultAvatar,
  ResultRiderName
} from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import pccAvatar from '../../assets/pcc-logo-round.png'

export default () => {
  return (
    <PageWrapper>
      <Panel>
        <h2>🌈 PCC Rainbow Race 🌈</h2>
        <p>A three-day grand tour split over four stages.</p>
        <p>Scoring is based on the Tour de France, so General Classification riders compete for the lowest time across all stages, Points riders contest sprints and climbers contest the mountain stages.</p>
        <p>There are some differences, segment times are treated individually so it is the fastest up them who wins the points - not necessarily the first.</p>
        <h2>General Classification (Men)</h2>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>2:08:04</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:08</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>+2:49</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/2497548'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2497548/13492816/1/medium.jpg' /></a><ResultRiderName>Robin Figueirado</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/11310673'><ResultAvatar src='https://graph.facebook.com/10206880429121922/picture?height=256&width=256' /></a><ResultRiderName>Nick Singleton</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h2>General Classification (Women)</h2>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>2:19:09</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>-</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h2>Points (Men)</h2>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>52</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>49</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>45</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>37</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/2497548'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2497548/13492816/1/medium.jpg' /></a><ResultRiderName>Robin Figueirado</ResultRiderName></td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>20</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>10</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/11310673'><ResultAvatar src='https://graph.facebook.com/10206880429121922/picture?height=256&width=256' /></a><ResultRiderName>Nick Singleton</ResultRiderName></td>
              <td width='100' align='center'>10</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>8</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h2>Points (Women)</h2>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>57</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>40</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>20</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h2>Climbs (Men)</h2>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>2</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2497548'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2497548/13492816/1/medium.jpg' /></a><ResultRiderName>Robin Figueirado</ResultRiderName></td>
              <td width='100' align='center'>1</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>1</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>0</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>0</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h2>Climbs (Women)</h2>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>2</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>2</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>1</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>Stage #4 - 2015 UCI Worlds Course - TT</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  <polygon points='490,0 503,0 503,100 490,100' fill='#29942a' />
  <polygon points='787,0 824,0 824,100 787,100' fill='#ff4e50' />
  <polyline points='7,85 12,84 18,83 26,83 34,82 43,82 52,82 62,82 72,82 83,82 93,82 104,82 115,83 126,83 137,82 146,82 155,81 165,81 175,81 185,80 194,80 203,80 213,79 223,80 234,80 244,79 255,79 265,79 276,79 287,79 298,80 309,80 319,79 330,80 341,80 352,80 363,80 374,80 386,80 398,81 409,81 421,81 432,82 445,83 457,83 468,83 479,82 490,82 501,82 512,82 522,82 533,82 545,82 559,85 575,88 589,89 605,92 621,94 634,94 646,95 658,95 669,95 680,94 689,93 700,95 711,95 722,95 733,95 744,95 755,95 764,94 775,95 786,94 794,93 799,91 804,90 809,89 812,88 816,86 820,85 824,84 830,84 838,84 848,84 860,86 877,91 888,88 891,86 895,85 899,84 908,85 922,90 939,93 954,93 967,94 978,93 986,92 992,91 995,95' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,85 12,84 18,83 26,83 34,82 43,82 52,82 62,82 72,82 83,82 93,82 104,82 115,83 126,83 137,82 146,82 155,81 165,81 175,81 185,80 194,80 203,80 213,79 223,80 234,80 244,79 255,79 265,79 276,79 287,79 298,80 309,80 319,79 330,80 341,80 352,80 363,80 374,80 386,80 398,81 409,81 421,81 432,82 445,83 457,83 468,83 479,82 490,82 501,82 512,82 522,82 533,82 545,82 559,85 575,88 589,89 605,92 621,94 634,94 646,95 658,95 669,95 680,94 689,93 700,95 711,95 722,95 733,95 744,95 755,95 764,94 775,95 786,94 794,93 799,91 804,90 809,89 812,88 816,86 820,85 824,84 830,84 838,84 848,84 860,86 877,91 888,88 891,86 895,85 899,84 908,85 922,90 939,93 954,93 967,94 978,93 986,92 992,91 995,95 995,100 5,100' fill='#9ea1ad' />
</svg>

        <p>A 16k timetrial around the UCI Worlds Course in Richmond, Virginia</p>
        <h4>⏱️ General Classification (Men)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>24:14</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>+0:18</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:02</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>+1:28</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ General Classification (Women)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>26:50</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>+0:06</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⚡ "Zwift W Broad St Sprint" (Men)</h4>
        <p>Intermediate sprint 200m 0%</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>0:18</td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>0:19</td>
              <td width='100' align='center'>17</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>0:19</td>
              <td width='100' align='center'>17</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>0:19</td>
              <td width='100' align='center'>17</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⚡ "Zwift W Broad St Sprint" (Women)</h4>
        <p>Intermediate sprint 200m 0%</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>0:20</td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>0:21</td>
              <td width='100' align='center'>17</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⛰️ "Richmond KOM." (Men)</h4>
        <p>600m long cat 4 "climb" rising a whopping 39m</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>1:53</td>
              <td width='100' align='center'>1</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>1:55</td>
              <td width='100' align='center'>-</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>2:00</td>
              <td width='100' align='center'>-</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>2:08</td>
              <td width='100' align='center'>-</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⛰️ "Richmond KOM." (Women)</h4>
        <p>600m long cat 4 "climb" rising a whopping 39m</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>2:04</td>
              <td width='100' align='center'>1</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>2:08</td>
              <td width='100' align='center'>-</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>Stage #3 - Triple Loops - Road Race</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  <polygon points='360,0 365,0 365,100 360,100' fill='#29942a' />
  <polygon points='502,0 627,0 627,100 502,100' fill='#ff4e50' />
  <polyline points='7,91 15,91 23,91 30,89 41,91 55,93 66,92 76,92 87,93 98,92 106,90 117,90 129,89 141,90 155,92 165,91 175,90 187,92 199,92 210,92 222,93 234,93 245,93 256,93 268,93 279,93 289,92 300,92 309,91 318,90 328,90 339,90 350,90 362,91 375,93 387,92 397,92 409,93 420,93 430,92 440,92 451,92 461,92 475,95 486,94 494,93 504,92 509,88 514,84 520,82 528,79 537,77 545,74 551,72 561,71 571,70 578,67 587,65 594,62 599,58 603,54 608,50 612,45 616,41 621,37 625,33 633,32 645,34 663,46 684,64 704,78 717,81 734,89 748,91 756,88 764,87 776,89 790,92 802,92 812,90 817,87 821,83 827,80 832,77 838,73 845,70 851,67 857,64 863,61 871,59 883,59 892,57 904,63 923,75 943,91 959,95 970,94 979,92 995,92' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,91 15,91 23,91 30,89 41,91 55,93 66,92 76,92 87,93 98,92 106,90 117,90 129,89 141,90 155,92 165,91 175,90 187,92 199,92 210,92 222,93 234,93 245,93 256,93 268,93 279,93 289,92 300,92 309,91 318,90 328,90 339,90 350,90 362,91 375,93 387,92 397,92 409,93 420,93 430,92 440,92 451,92 461,92 475,95 486,94 494,93 504,92 509,88 514,84 520,82 528,79 537,77 545,74 551,72 561,71 571,70 578,67 587,65 594,62 599,58 603,54 608,50 612,45 616,41 621,37 625,33 633,32 645,34 663,46 684,64 704,78 717,81 734,89 748,91 756,88 764,87 776,89 790,92 802,92 812,90 817,87 821,83 827,80 832,77 838,73 845,70 851,67 857,64 863,61 871,59 883,59 892,57 904,63 923,75 943,91 959,95 970,94 979,92 995,92 995,100 5,100' fill='#9ea1ad' />
</svg>

        <p>A 40k road race around the Surrey Hills</p>
        <h4>⏱️ General Classification (Men)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>1:12:33</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:21</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/2497548'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2497548/13492816/1/medium.jpg' /></a><ResultRiderName>Robin Figueirado</ResultRiderName></td>
              <td width='100' align='center'>+1:56</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>+2:27</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ General Classification (Women)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>1:19:55</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>+0:08</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⚡ "The Mall Sprint Forward (Zwift Insider verified)" (Men)</h4>
        <p>180m intermediate sprint, -1% gradient</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2497548'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2497548/13492816/1/medium.jpg' /></a><ResultRiderName>Robin Figueirado</ResultRiderName></td>
              <td width='100' align='center'>0:14</td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>0:15</td>
              <td width='100' align='center'>17</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>0:15</td>
              <td width='100' align='center'>17</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>0:15</td>
              <td width='100' align='center'>17</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⚡ "The Mall Sprint Forward (Zwift Insider verified)" (Women)</h4>
        <p>180m intermediate sprint, -1% gradient</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>0:15</td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>0:15</td>
              <td width='100' align='center'>20</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⛰️ "Leith Hill Full - VeloViewer" (Men)</h4>
        <p>5.24km cat 3 climb rising 238m</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>14:24</td>
              <td width='100' align='center'>2</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2497548'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2497548/13492816/1/medium.jpg' /></a><ResultRiderName>Robin Figueirado</ResultRiderName></td>
              <td width='100' align='center'>14:53</td>
              <td width='100' align='center'>1</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>14:57</td>
              <td width='100' align='center'>-</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>15:12</td>
              <td width='100' align='center'>-</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⛰️ "Leith Hill Full - VeloViewer" (Women)</h4>
        <p>5.24km cat 3 climb rising 238m</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>17:24</td>
              <td width='100' align='center'>2</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>17:24</td>
              <td width='100' align='center'>2</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>Stage #2 - Innsbruckring - Crit</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  <polygon points='445,0 464,0 464,100 445,100' fill='#29942a' />
  
  <polyline points='6,88 10,88 15,88 19,88 20,88 24,88 30,88 38,88 48,90 59,93 70,91 80,91 92,92 104,93 115,91 126,91 138,92 148,91 159,90 170,91 181,92 192,90 201,87 211,83 219,82 230,85 242,91 255,92 266,91 277,91 288,91 298,90 308,88 317,86 327,86 337,83 344,75 348,68 353,61 357,53 363,49 374,66 390,76 403,73 417,91 432,93 446,91 457,88 467,87 477,87 488,92 500,93 512,95 522,92 532,91 542,90 552,88 562,88 572,88 582,88 593,90 604,92 615,92 625,91 636,92 646,93 657,92 667,91 677,92 688,92 699,91 709,90 720,92 732,92 742,90 752,86 760,83 769,82 780,87 792,92 803,92 814,91 824,91 834,91 844,90 854,88 863,87 872,86 882,83 891,75 897,64 903,54 910,49 922,68 939,76 951,75 966,92 979,93 995,115' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M6,88 10,88 15,88 19,88 20,88 24,88 30,88 38,88 48,90 59,93 70,91 80,91 92,92 104,93 115,91 126,91 138,92 148,91 159,90 170,91 181,92 192,90 201,87 211,83 219,82 230,85 242,91 255,92 266,91 277,91 288,91 298,90 308,88 317,86 327,86 337,83 344,75 348,68 353,61 357,53 363,49 374,66 390,76 403,73 417,91 432,93 446,91 457,88 467,87 477,87 488,92 500,93 512,95 522,92 532,91 542,90 552,88 562,88 572,88 582,88 593,90 604,92 615,92 625,91 636,92 646,93 657,92 667,91 677,92 688,92 699,91 709,90 720,92 732,92 742,90 752,86 760,83 769,82 780,87 792,92 803,92 814,91 824,91 834,91 844,90 854,88 863,87 872,86 882,83 891,75 897,64 903,54 910,49 922,68 939,76 951,75 966,92 979,93 995,115 995,100 5,100' fill='#9ea1ad' />
</svg>

        <p>A 16k crit around Innsbruck</p>
        <h4>⏱️ General Classification (Men)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>24:19</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+0:04</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>+0:05</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>+0:24</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>+0:48</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+1:41</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/11310673'><ResultAvatar src='https://graph.facebook.com/10206880429121922/picture?height=256&width=256' /></a><ResultRiderName>Nick Singleton</ResultRiderName></td>
              <td width='100' align='center'>+1:59</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>+13:32</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ General Classification (Women)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>26:16</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>+0:02</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⚡ "Innsbruck Sprint Forward" (Men)</h4>
        <p>300m intermediate sprint</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>0:26</td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>0:26</td>
              <td width='100' align='center'>20</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>0:27</td>
              <td width='100' align='center'>15</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>0:27</td>
              <td width='100' align='center'>15</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>0:28</td>
              <td width='100' align='center'>11</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>0:29</td>
              <td width='100' align='center'>10</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/11310673'><ResultAvatar src='https://graph.facebook.com/10206880429121922/picture?height=256&width=256' /></a><ResultRiderName>Nick Singleton</ResultRiderName></td>
              <td width='100' align='center'>0:29</td>
              <td width='100' align='center'>10</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>0:42</td>
              <td width='100' align='center'>8</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⚡ "Innsbruck Sprint Forward" (Women)</h4>
        <p>300m intermediate sprint</p>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
              <ResultHeader width='100' align='center'>Points</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>0:28</td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>0:28</td>
              <td width='100' align='center'>20</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>Stage #1 - Duchy Estate - Prologue</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='6,86 10,86 14,86 20,86 27,86 34,87 43,87 52,87 61,87 71,87 81,87 92,88 103,88 114,88 126,89 138,89 149,89 161,89 172,90 184,92 198,93 212,94 225,94 237,93 247,93 258,93 267,92 276,91 283,91 289,90 295,90 301,89 306,89 311,88 317,88 322,88 328,87 335,87 342,87 349,87 356,87 363,87 371,86 378,86 386,86 393,85 400,85 408,85 415,85 422,85 430,84 437,84 445,84 453,85 462,85 471,85 480,84 488,84 497,84 505,84 514,84 524,85 534,86 545,87 557,87 568,87 579,87 589,87 599,87 610,88 621,88 632,88 644,89 655,89 667,89 678,90 690,91 701,91 713,92 725,92 737,92 748,92 759,93 770,94 782,95 794,95 805,94 815,94 824,93 832,93 839,92 845,92 851,91 857,91 863,91 870,91 877,91 886,91 895,92 905,92 915,92 926,92 936,92 946,92 956,93 966,93 976,93 985,93 995,106' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M6,86 10,86 14,86 20,86 27,86 34,87 43,87 52,87 61,87 71,87 81,87 92,88 103,88 114,88 126,89 138,89 149,89 161,89 172,90 184,92 198,93 212,94 225,94 237,93 247,93 258,93 267,92 276,91 283,91 289,90 295,90 301,89 306,89 311,88 317,88 322,88 328,87 335,87 342,87 349,87 356,87 363,87 371,86 378,86 386,86 393,85 400,85 408,85 415,85 422,85 430,84 437,84 445,84 453,85 462,85 471,85 480,84 488,84 497,84 505,84 514,84 524,85 534,86 545,87 557,87 568,87 579,87 589,87 599,87 610,88 621,88 632,88 644,89 655,89 667,89 678,90 690,91 701,91 713,92 725,92 737,92 748,92 759,93 770,94 782,95 794,95 805,94 815,94 824,93 832,93 839,92 845,92 851,91 857,91 863,91 870,91 877,91 886,91 895,92 905,92 915,92 926,92 936,92 946,92 956,93 966,93 976,93 985,93 995,106 995,100 5,100' fill='#9ea1ad' />
</svg>

        <p>A 4k TT through Yorkshire</p>
        <h4>⏱️ General Classification (Men)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>5:25</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>+0:07</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+0:14</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/2064786'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2064786/8125569/2/medium.jpg' /></a><ResultRiderName>Conor McKenna - No Vap</ResultRiderName></td>
              <td width='100' align='center'>+0:22</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>+0:27</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/11310673'><ResultAvatar src='https://graph.facebook.com/10206880429121922/picture?height=256&width=256' /></a><ResultRiderName>Nick Singleton</ResultRiderName></td>
              <td width='100' align='center'>+0:40</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ General Classification (Women)</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>6:08</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>+0:10</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
      </Panel>
      <LinkPanel background={equipmentBackground.src}>
        <Link to='/results'>Results</Link>
      </LinkPanel>
      <LinkPanel background={membershipBackground.src}>
        <Link to='/membership'>Membership</Link>
      </LinkPanel>
    </PageWrapper>
  )
}

