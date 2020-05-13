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
        <h2>PCC Lockdown Crits</h2>
        <p>Wednesday night fun</p>
        <h2>Points (General)</h2>
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
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>76</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>67</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>66</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>58</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>50</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>39</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'>39</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>38</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>33</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>10</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>24</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>11</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'>23</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>12</td>
              <td ><a href='https://www.strava.com/athletes/1737575'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/1737575/2581397/2/medium.jpg' /></a><ResultRiderName>Robert Whitworth</ResultRiderName></td>
              <td width='100' align='center'>20</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>12</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>12</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>20</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>15</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>14</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>16</td>
              <td ><a href='https://www.strava.com/athletes/30080876'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/30080876/12666634/1/medium.jpg' /></a><ResultRiderName>Joe Howley</ResultRiderName></td>
              <td width='100' align='center'>7</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>17</td>
              <td ><a href='https://www.strava.com/athletes/7408043'><ResultAvatar src={pccAvatar} /></a><ResultRiderName>Suf Sav</ResultRiderName></td>
              <td width='100' align='center'>6</td>
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
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>76</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>58</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>38</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#5 - Grand Central Circuit</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='9,94 21,94 31,94 43,94 54,93 60,91 65,90 74,89 80,87 86,85 91,83 97,82 108,81 114,79 119,78 124,76 131,75 139,74 143,72 148,70 154,69 158,67 162,65 168,64 178,65 196,70 214,73 236,82 258,87 280,92 299,94 314,94 327,95 340,94 351,94 363,93 374,93 389,94 403,95 415,93 423,92 435,94 450,94 463,94 476,94 484,92 490,90 496,89 503,88 508,86 513,84 518,83 526,82 535,81 540,79 544,78 549,76 555,75 564,74 568,72 573,70 579,69 583,67 587,65 593,64 605,66 624,70 644,75 667,83 690,89 711,94 729,94 743,94 757,95 768,94 779,94 791,93 803,94 817,94 831,95 842,93 851,92 864,94 879,94 892,94 905,93 911,91 916,90 923,89 929,87 933,86 938,84 943,83 950,82 959,81 964,79 969,78 973,76 979,75 987,75 993,73 995,97' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M9,94 21,94 31,94 43,94 54,93 60,91 65,90 74,89 80,87 86,85 91,83 97,82 108,81 114,79 119,78 124,76 131,75 139,74 143,72 148,70 154,69 158,67 162,65 168,64 178,65 196,70 214,73 236,82 258,87 280,92 299,94 314,94 327,95 340,94 351,94 363,93 374,93 389,94 403,95 415,93 423,92 435,94 450,94 463,94 476,94 484,92 490,90 496,89 503,88 508,86 513,84 518,83 526,82 535,81 540,79 544,78 549,76 555,75 564,74 568,72 573,70 579,69 583,67 587,65 593,64 605,66 624,70 644,75 667,83 690,89 711,94 729,94 743,94 757,95 768,94 779,94 791,93 803,94 817,94 831,95 842,93 851,92 864,94 879,94 892,94 905,93 911,91 916,90 923,89 929,87 933,86 938,84 943,83 950,82 959,81 964,79 969,78 973,76 979,75 987,75 993,73 995,97 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
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
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>29:44</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>+0:01</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:31</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'>+1:33</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>+1:56</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'>+2:16</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+3:08</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'>+3:20</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
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
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>32:42</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>+0:17</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#4 - Duchy Estate</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='7,86 14,87 22,87 33,88 45,89 58,93 70,93 80,90 88,88 96,87 105,85 114,84 124,84 135,85 148,87 161,88 175,90 189,92 203,94 216,92 225,91 236,92 248,93 260,92 267,89 272,88 278,87 286,86 293,85 301,84 310,84 321,85 333,87 346,88 359,90 373,92 387,94 399,93 407,91 416,92 427,93 439,93 448,91 454,89 459,87 466,87 473,86 481,85 490,85 499,84 510,85 523,87 536,89 550,91 564,93 577,94 587,92 594,91 604,92 616,93 628,92 636,90 641,88 647,87 654,86 661,85 669,85 678,85 688,84 700,87 712,87 726,89 739,92 753,93 766,94 774,91 781,91 792,92 804,93 815,92 823,89 828,88 834,87 842,86 850,85 858,84 868,84 878,85 891,87 903,88 916,90 930,92 945,94 956,92 964,91 973,92 985,93 995,119' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,86 14,87 22,87 33,88 45,89 58,93 70,93 80,90 88,88 96,87 105,85 114,84 124,84 135,85 148,87 161,88 175,90 189,92 203,94 216,92 225,91 236,92 248,93 260,92 267,89 272,88 278,87 286,86 293,85 301,84 310,84 321,85 333,87 346,88 359,90 373,92 387,94 399,93 407,91 416,92 427,93 439,93 448,91 454,89 459,87 466,87 473,86 481,85 490,85 499,84 510,85 523,87 536,89 550,91 564,93 577,94 587,92 594,91 604,92 616,93 628,92 636,90 641,88 647,87 654,86 661,85 669,85 678,85 688,84 700,87 712,87 726,89 739,92 753,93 766,94 774,91 781,91 792,92 804,93 815,92 823,89 828,88 834,87 842,86 850,85 858,84 868,84 878,85 891,87 903,88 916,90 930,92 945,94 956,92 964,91 973,92 985,93 995,119 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
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
              <td ><a href='https://www.strava.com/athletes/1737575'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/1737575/2581397/2/medium.jpg' /></a><ResultRiderName>Robert Whitworth</ResultRiderName></td>
              <td width='100' align='center'>23:40</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>+0:01</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>+0:26</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>+0:31</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'>+0:39</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:08</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+3:13</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
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
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>24:58</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>+0:59</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#3 - Classique</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='7,93 12,94 20,94 28,94 38,95 47,95 56,95 64,95 71,94 80,94 89,94 100,94 112,95 124,95 135,95 145,95 156,95 166,95 176,94 186,94 196,94 205,93 215,93 225,93 233,92 240,91 250,91 260,92 270,91 280,91 291,91 301,91 311,92 321,92 332,91 342,92 354,93 366,93 378,94 390,94 402,95 414,95 425,95 435,94 445,94 453,94 463,95 474,95 485,95 496,95 506,95 517,95 528,95 537,94 547,94 557,94 568,93 578,93 588,93 596,91 603,91 613,92 623,92 633,91 643,91 653,91 663,91 672,92 682,92 692,91 702,92 713,93 724,93 736,94 749,94 761,95 773,95 784,95 794,94 803,94 812,94 822,94 832,95 843,95 854,95 865,95 876,95 887,95 897,94 908,94 919,94 929,93 940,94 950,92 958,91 968,91 980,92 995,93' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,93 12,94 20,94 28,94 38,95 47,95 56,95 64,95 71,94 80,94 89,94 100,94 112,95 124,95 135,95 145,95 156,95 166,95 176,94 186,94 196,94 205,93 215,93 225,93 233,92 240,91 250,91 260,92 270,91 280,91 291,91 301,91 311,92 321,92 332,91 342,92 354,93 366,93 378,94 390,94 402,95 414,95 425,95 435,94 445,94 453,94 463,95 474,95 485,95 496,95 506,95 517,95 528,95 537,94 547,94 557,94 568,93 578,93 588,93 596,91 603,91 613,92 623,92 633,91 643,91 653,91 663,91 672,92 682,92 692,91 702,92 713,93 724,93 736,94 749,94 761,95 773,95 784,95 794,94 803,94 812,94 822,94 832,95 843,95 854,95 865,95 876,95 887,95 897,94 908,94 919,94 929,93 940,94 950,92 958,91 968,91 980,92 995,93 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
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
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>21:09</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>+0:02</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>+0:10</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>+1:16</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>+1:22</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+1:37</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'>+2:46</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/30080876'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/30080876/12666634/1/medium.jpg' /></a><ResultRiderName>Joe Howley</ResultRiderName></td>
              <td width='100' align='center'>+2:52</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/7408043'><ResultAvatar src={pccAvatar} /></a><ResultRiderName>Suf Sav</ResultRiderName></td>
              <td width='100' align='center'>+7:55</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>10</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>DNF</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
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
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>23:13</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#2 - Volcano Circuit CCW</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='8,93 18,93 28,93 39,93 51,93 62,93 74,93 86,93 97,92 109,93 121,93 134,95 148,95 160,95 171,95 182,95 191,94 199,93 207,93 216,93 225,92 234,92 243,92 253,93 264,93 274,93 285,93 295,93 305,93 315,93 325,93 336,93 346,93 355,93 365,92 374,92 385,93 396,93 409,95 421,95 432,95 443,95 454,95 463,94 470,93 478,93 487,93 497,92 505,92 514,92 524,93 535,93 546,93 557,93 567,93 576,93 586,93 596,93 607,93 617,93 627,93 637,92 647,93 658,93 669,94 681,95 693,95 704,95 714,95 724,95 733,94 740,93 747,93 755,93 765,92 774,92 784,92 794,92 805,93 816,93 826,93 836,93 846,93 856,93 867,93 877,93 887,93 897,93 907,93 916,92 926,93 937,93 949,95 961,95 972,95 983,95 995,95' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M8,93 18,93 28,93 39,93 51,93 62,93 74,93 86,93 97,92 109,93 121,93 134,95 148,95 160,95 171,95 182,95 191,94 199,93 207,93 216,93 225,92 234,92 243,92 253,93 264,93 274,93 285,93 295,93 305,93 315,93 325,93 336,93 346,93 355,93 365,92 374,92 385,93 396,93 409,95 421,95 432,95 443,95 454,95 463,94 470,93 478,93 487,93 497,92 505,92 514,92 524,93 535,93 546,93 557,93 567,93 576,93 586,93 596,93 607,93 617,93 627,93 637,92 647,93 658,93 669,94 681,95 693,95 704,95 714,95 724,95 733,94 740,93 747,93 755,93 765,92 774,92 784,92 794,92 805,93 816,93 826,93 836,93 846,93 856,93 867,93 877,93 887,93 897,93 907,93 916,92 926,93 937,93 949,95 961,95 972,95 983,95 995,95 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
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
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>19:48</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:46</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>+2:06</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+2:09</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>+2:15</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>+NaN:NaN</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'>+2:20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'>+2:43</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'>+4:16</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
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
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>22:24</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>+0:08</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#1 - London Classique</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='8,94 17,94 28,94 40,95 52,95 64,95 74,94 83,94 92,94 102,95 113,95 124,95 135,95 146,95 156,95 166,95 176,94 185,94 196,94 206,93 216,93 226,93 234,91 243,91 253,92 263,92 273,91 283,91 293,91 303,92 313,92 323,92 333,92 344,92 356,93 369,94 381,94 394,95 406,95 418,95 428,94 438,94 446,94 456,94 467,95 478,95 488,95 499,95 509,95 519,95 529,95 537,94 547,94 557,94 566,93 575,93 585,93 593,91 600,91 609,92 619,92 630,91 640,91 650,91 659,91 669,92 679,92 688,91 698,92 708,93 719,93 731,94 742,94 754,95 765,95 777,95 787,94 796,94 805,94 814,94 824,95 835,95 845,95 856,95 866,95 877,95 888,95 898,94 909,94 919,94 930,93 941,93 950,92 959,91 970,92 981,92 995,93' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M8,94 17,94 28,94 40,95 52,95 64,95 74,94 83,94 92,94 102,95 113,95 124,95 135,95 146,95 156,95 166,95 176,94 185,94 196,94 206,93 216,93 226,93 234,91 243,91 253,92 263,92 273,91 283,91 293,91 303,92 313,92 323,92 333,92 344,92 356,93 369,94 381,94 394,95 406,95 418,95 428,94 438,94 446,94 456,94 467,95 478,95 488,95 499,95 509,95 519,95 529,95 537,94 547,94 557,94 566,93 575,93 585,93 593,91 600,91 609,92 619,92 630,91 640,91 650,91 659,91 669,92 679,92 688,91 698,92 708,93 719,93 731,94 742,94 754,95 765,95 777,95 787,94 796,94 805,94 814,94 824,95 835,95 845,95 856,95 866,95 877,95 888,95 898,94 909,94 919,94 930,93 941,93 950,92 959,91 970,92 981,92 995,93 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
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
              <td width='100' align='center'>20:58</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+0:07</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>+1:17</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>+1:34</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'>+2:11</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'>+2:21</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'>+5:49</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
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
              <td width='100' align='center'>22:35</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>+0:36</td>
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

