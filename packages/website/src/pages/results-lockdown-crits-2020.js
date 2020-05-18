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
  ResultRiderName,
  ResultIcon
} from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import pccAvatar from '../../assets/pcc-logo-round.png'
import stravaIcon from '../../assets/strava.png'

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
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>81</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>74</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>60</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'>56</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>48</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>38</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'>38</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'>36</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>34</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>10</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'>24</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>11</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'>23</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>12</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'>22</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>13</td>
              <td ><a href='https://www.strava.com/athletes/1737575'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/1737575/2581397/2/medium.jpg' /></a><ResultRiderName>Robert Whitworth</ResultRiderName></td>
              <td width='100' align='center'>20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>14</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'>18</td>
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
              <td width='100' align='center'>5</td>
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
  
  
  <polyline points='9,94 21,94 31,94 43,94 54,93 60,91 65,90 74,89 80,87 85,85 91,83 97,82 107,81 114,79 119,78 124,76 131,75 139,74 143,72 148,70 154,69 158,67 161,65 167,64 178,65 195,70 214,73 236,82 258,87 279,92 298,94 313,94 327,95 339,94 350,94 362,93 373,93 388,94 402,95 414,93 422,92 435,94 449,94 462,94 475,94 483,92 489,90 495,89 502,88 507,86 512,84 517,83 525,82 534,81 539,79 543,78 548,76 554,75 563,74 567,72 572,70 578,69 582,67 586,65 592,64 603,66 623,70 642,75 666,83 688,89 710,94 728,94 742,94 755,95 767,94 778,94 789,93 801,94 816,94 830,95 841,93 849,92 862,94 877,94 890,94 903,93 909,91 914,90 921,89 927,87 931,86 937,84 941,83 948,82 957,81 962,79 967,78 971,76 977,75 985,75 990,73 995,85' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M9,94 21,94 31,94 43,94 54,93 60,91 65,90 74,89 80,87 85,85 91,83 97,82 107,81 114,79 119,78 124,76 131,75 139,74 143,72 148,70 154,69 158,67 161,65 167,64 178,65 195,70 214,73 236,82 258,87 279,92 298,94 313,94 327,95 339,94 350,94 362,93 373,93 388,94 402,95 414,93 422,92 435,94 449,94 462,94 475,94 483,92 489,90 495,89 502,88 507,86 512,84 517,83 525,82 534,81 539,79 543,78 548,76 554,75 563,74 567,72 572,70 578,69 582,67 586,65 592,64 603,66 623,70 642,75 666,83 688,89 710,94 728,94 742,94 755,95 767,94 778,94 789,93 801,94 816,94 830,95 841,93 849,92 862,94 877,94 890,94 903,93 909,91 914,90 921,89 927,87 931,86 937,84 941,83 948,82 957,81 962,79 967,78 971,76 977,75 985,75 990,73 995,85 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409394170'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>29:52</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409517881'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:06</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409481163'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:29</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/2505569'><ResultAvatar src='https://graph.facebook.com/568910174/picture?height=256&width=256' /></a><ResultRiderName>Alex Potsides</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409403370'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:33</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409475732'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:05</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409407450'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:20</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409435807'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+3:05</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409428657'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+3:07</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409443265'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+3:15</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>10</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409412603'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+3:18</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409435807'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>32:57</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3409412603'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:13</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#4 - Duchy Estate</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='7,86 14,87 22,87 33,88 45,89 58,93 70,93 79,90 87,88 95,87 104,85 113,84 124,84 134,85 147,87 160,88 174,90 188,92 202,94 215,92 224,91 235,92 247,93 258,92 265,89 271,88 277,87 284,86 292,85 299,84 309,84 319,85 331,87 344,88 357,90 372,92 385,94 397,93 405,91 414,92 425,93 437,93 446,91 452,89 457,87 463,87 471,86 479,85 487,85 497,84 507,85 520,87 534,89 547,91 561,93 575,94 584,92 591,91 601,92 613,93 625,92 633,90 638,88 644,87 650,86 658,85 666,85 675,85 684,84 696,87 709,87 722,89 736,92 749,93 762,94 770,91 777,91 788,92 800,93 811,92 818,89 824,88 830,87 838,86 846,85 854,84 864,84 874,85 886,87 899,88 912,90 926,92 940,94 951,92 959,91 968,92 980,93 995,101' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,86 14,87 22,87 33,88 45,89 58,93 70,93 79,90 87,88 95,87 104,85 113,84 124,84 134,85 147,87 160,88 174,90 188,92 202,94 215,92 224,91 235,92 247,93 258,92 265,89 271,88 277,87 284,86 292,85 299,84 309,84 319,85 331,87 344,88 357,90 372,92 385,94 397,93 405,91 414,92 425,93 437,93 446,91 452,89 457,87 463,87 471,86 479,85 487,85 497,84 507,85 520,87 534,89 547,91 561,93 575,94 584,92 591,91 601,92 613,93 625,92 633,90 638,88 644,87 650,86 658,85 666,85 675,85 684,84 696,87 709,87 722,89 736,92 749,93 762,94 770,91 777,91 788,92 800,93 811,92 818,89 824,88 830,87 838,86 846,85 854,84 864,84 874,85 886,87 899,88 912,90 926,92 940,94 951,92 959,91 968,92 980,93 995,101 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/1737575'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/1737575/2581397/2/medium.jpg' /></a><ResultRiderName>Robert Whitworth</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372055331'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>23:47</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372086144'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:02</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372056515'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:27</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372083467'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:35</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372054271'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:38</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372056914'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:19</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372138218'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:36</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372088761'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:19</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372073835'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+3:17</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372056914'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>25:06</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3372088761'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:00</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#3 - Classique</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='7,93 12,94 19,94 28,94 38,95 47,95 55,95 63,95 71,94 79,94 88,94 99,94 111,95 122,95 134,95 144,95 155,95 165,95 174,94 184,94 194,94 204,93 213,93 223,93 231,92 238,91 247,91 258,92 268,91 278,91 288,91 298,91 308,92 318,92 329,91 339,92 351,93 363,93 375,94 387,94 399,95 410,95 421,95 431,94 441,94 450,94 459,95 470,95 481,95 492,95 502,95 513,95 523,95 533,94 542,94 553,94 563,93 573,93 583,93 590,91 598,91 607,92 617,92 627,91 637,91 647,91 657,91 666,92 676,92 686,91 696,92 706,93 718,93 730,94 743,94 755,95 766,95 777,95 787,94 797,94 805,94 814,94 825,95 835,95 846,95 857,95 868,95 879,95 890,94 900,94 911,94 921,93 931,94 942,92 950,91 960,91 972,92 983,91 995,94' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,93 12,94 19,94 28,94 38,95 47,95 55,95 63,95 71,94 79,94 88,94 99,94 111,95 122,95 134,95 144,95 155,95 165,95 174,94 184,94 194,94 204,93 213,93 223,93 231,92 238,91 247,91 258,92 268,91 278,91 288,91 298,91 308,92 318,92 329,91 339,92 351,93 363,93 375,94 387,94 399,95 410,95 421,95 431,94 441,94 450,94 459,95 470,95 481,95 492,95 502,95 513,95 523,95 533,94 542,94 553,94 563,93 573,93 583,93 590,91 598,91 607,92 617,92 627,91 637,91 647,91 657,91 666,92 676,92 686,91 696,92 706,93 718,93 730,94 743,94 755,95 766,95 777,95 787,94 797,94 805,94 814,94 825,95 835,95 846,95 857,95 868,95 879,95 890,94 900,94 911,94 921,93 931,94 942,92 950,91 960,91 972,92 983,91 995,94 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337438220'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>18:34</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337493483'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:44</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337496460'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:46</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337477643'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:58</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337519702'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+3:59</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337476135'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+4:06</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337525656'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+4:21</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337535219'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+4:48</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/30080876'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/30080876/12666634/1/medium.jpg' /></a><ResultRiderName>Joe Howley</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337486549'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+5:28</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>10</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337533399'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+5:31</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>11</td>
              <td ><a href='https://www.strava.com/athletes/7408043'><ResultAvatar src={pccAvatar} /></a><ResultRiderName>Suf Sav</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337553367'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+10:37</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3337535219'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>23:22</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#2 - Volcano Circuit CCW</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='8,93 18,93 28,93 39,93 50,93 62,93 74,93 86,93 97,92 108,93 120,93 133,95 147,95 159,95 170,95 181,95 190,94 198,93 206,93 215,93 225,92 233,92 242,92 252,93 263,93 273,93 284,93 294,93 304,93 314,93 324,93 334,93 344,93 354,93 363,92 372,92 383,93 394,93 407,95 419,95 430,95 441,95 452,95 461,94 468,93 476,93 486,93 495,92 503,92 512,92 522,93 533,93 544,93 554,93 564,93 574,93 584,93 594,93 604,93 614,93 624,93 635,92 644,93 655,93 666,94 678,95 690,95 701,95 711,95 721,95 730,94 737,93 744,93 752,93 762,92 771,92 781,92 791,92 802,93 812,93 823,93 833,93 843,93 853,93 863,93 873,93 883,93 894,93 903,93 912,92 923,93 934,93 946,95 957,95 968,95 979,95 995,95' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M8,93 18,93 28,93 39,93 50,93 62,93 74,93 86,93 97,92 108,93 120,93 133,95 147,95 159,95 170,95 181,95 190,94 198,93 206,93 215,93 225,92 233,92 242,92 252,93 263,93 273,93 284,93 294,93 304,93 314,93 324,93 334,93 344,93 354,93 363,92 372,92 383,93 394,93 407,95 419,95 430,95 441,95 452,95 461,94 468,93 476,93 486,93 495,92 503,92 512,92 522,93 533,93 544,93 554,93 564,93 574,93 584,93 594,93 604,93 614,93 624,93 635,92 644,93 655,93 666,94 678,95 690,95 701,95 711,95 721,95 730,94 737,93 744,93 752,93 762,92 771,92 781,92 791,92 802,93 812,93 823,93 833,93 843,93 853,93 863,93 873,93 883,93 894,93 903,93 912,92 923,93 934,93 946,95 957,95 968,95 979,95 995,95 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/104169'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/104169/104387/2/medium.jpg' /></a><ResultRiderName>stef r</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303968880'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>19:51</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303910843'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:45</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303971968'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:10</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303960205'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:15</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303919911'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:16</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303857808'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:21</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303926426'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:23</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303933677'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:41</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303911716'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:47</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>10</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303947563'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:51</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>11</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303958903'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+4:17</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303933677'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>22:32</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/2505487'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/2505487/871496/1/medium.jpg' /></a><ResultRiderName>Katherine Potsides</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3303947563'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:10</td>
            </ResultOddRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#1 - London Classique</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='8,94 17,94 27,94 40,95 52,95 63,95 73,94 82,94 91,94 101,95 112,95 123,95 134,95 145,95 155,95 165,95 174,94 184,94 194,94 204,93 214,93 225,93 233,91 241,91 251,92 261,92 271,91 281,91 291,91 301,92 311,92 321,92 331,92 342,92 353,93 366,94 378,94 391,95 403,95 414,95 425,94 435,94 443,94 452,94 463,95 475,95 485,95 495,95 505,95 515,95 525,95 533,94 543,94 553,94 562,93 571,93 581,93 588,91 596,91 605,92 615,92 625,91 635,91 645,91 655,91 664,92 674,92 683,91 693,92 703,93 714,93 725,94 737,94 749,95 760,95 771,95 781,94 790,94 799,94 808,94 818,95 829,95 839,95 850,95 860,95 871,95 881,95 892,94 902,94 913,94 923,93 934,93 943,92 952,91 963,92 974,92 984,91 995,95' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M8,94 17,94 27,94 40,95 52,95 63,95 73,94 82,94 91,94 101,95 112,95 123,95 134,95 145,95 155,95 165,95 174,94 184,94 194,94 204,93 214,93 225,93 233,91 241,91 251,92 261,92 271,91 281,91 291,91 301,92 311,92 321,92 331,92 342,92 353,93 366,94 378,94 391,95 403,95 414,95 425,94 435,94 443,94 452,94 463,95 475,95 485,95 495,95 505,95 515,95 525,95 533,94 543,94 553,94 562,93 571,93 581,93 588,91 596,91 605,92 615,92 625,91 635,91 645,91 655,91 664,92 674,92 683,91 693,92 703,93 714,93 725,94 737,94 749,95 760,95 771,95 781,94 790,94 799,94 808,94 818,95 829,95 839,95 850,95 860,95 871,95 881,95 892,94 902,94 913,94 923,93 934,93 943,92 952,91 963,92 974,92 984,91 995,95 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ General</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/4312734'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/4312734/2268752/2/medium.jpg' /></a><ResultRiderName>Will Johnson</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272484375'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>21:05</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272487329'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:08</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272451647'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:17</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272460525'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:41</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272514484'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+1:48</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272457894'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:14</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/20456040'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/20456040/5949621/2/medium.jpg' /></a><ResultRiderName>Ben Mort</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272449481'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:20</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
              <td ><a href='https://www.strava.com/athletes/41594275'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/41594275/11962456/1/medium.jpg' /></a><ResultRiderName>nick renny</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272461104'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+2:24</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>9</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272498553'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+5:57</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <h4>⏱️ Women</h4>
        <ResultTable>
          <thead>
            <tr>
              <ResultHeader width='100' align='center'>Position</ResultHeader>
              <ResultHeader >Name</ResultHeader>
              <ResultHeader width='100' align='center'>Activity</ResultHeader>
              <ResultHeader width='100' align='center'>Time</ResultHeader>
            </tr>
          </thead>
          <tbody>
            <ResultRow>
              <td width='100' align='center'>1</td>
              <td ><a href='https://www.strava.com/athletes/11496118'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/11496118/9922909/1/medium.jpg' /></a><ResultRiderName>Liz M  Ⓥ </ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272460525'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>22:46</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'><a href='https://www.strava.com/activities/3272457894'><ResultIcon src={stravaIcon} /></a></td>
              <td width='100' align='center'>+0:33</td>
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

