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
        <h3>#5 - Grand Central Circuit</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='8,93 20,94 31,94 42,94 54,94 60,92 65,90 73,89 80,87 86,85 91,83 98,82 108,82 114,79 120,78 125,76 133,75 141,73 146,71 152,70 158,68 161,66 167,64 177,65 193,69 212,72 233,81 254,86 276,91 296,94 311,94 324,95 338,94 349,94 361,93 373,93 388,94 402,95 415,94 424,92 435,94 451,94 463,94 477,94 485,92 490,90 497,89 504,87 509,86 515,84 520,82 529,82 537,80 542,79 547,77 553,76 561,75 567,73 572,71 578,70 583,67 587,65 594,64 604,65 621,70 639,73 661,81 682,87 703,92 723,94 738,94 751,95 763,94 775,94 786,93 797,93 811,94 824,95 837,94 846,92 856,93 871,94 884,94 897,94 908,93 913,91 919,90 927,89 931,87 937,85 941,83 948,82 957,82 964,80 969,78 974,76 980,75 989,74 995,77' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M8,93 20,94 31,94 42,94 54,94 60,92 65,90 73,89 80,87 86,85 91,83 98,82 108,82 114,79 120,78 125,76 133,75 141,73 146,71 152,70 158,68 161,66 167,64 177,65 193,69 212,72 233,81 254,86 276,91 296,94 311,94 324,95 338,94 349,94 361,93 373,93 388,94 402,95 415,94 424,92 435,94 451,94 463,94 477,94 485,92 490,90 497,89 504,87 509,86 515,84 520,82 529,82 537,80 542,79 547,77 553,76 561,75 567,73 572,71 578,70 583,67 587,65 594,64 604,65 621,70 639,73 661,81 682,87 703,92 723,94 738,94 751,95 763,94 775,94 786,93 797,93 811,94 824,95 837,94 846,92 856,93 871,94 884,94 897,94 908,93 913,91 919,90 927,89 931,87 937,85 941,83 948,82 957,82 964,80 969,78 974,76 980,75 989,74 995,77 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ Men</h4>
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
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+3:08</td>
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
  
  
  <polyline points='7,86 13,87 20,87 30,88 40,89 50,91 63,93 74,91 84,88 93,87 103,85 112,85 122,85 132,84 143,87 155,87 167,89 179,91 192,93 204,94 214,92 222,91 232,92 243,93 254,93 262,90 269,88 275,87 282,86 290,85 298,84 307,85 316,84 327,87 339,87 351,89 364,91 377,93 390,94 400,92 407,91 418,92 429,93 440,93 447,90 453,88 459,87 467,86 474,85 482,84 491,85 500,84 512,87 523,87 536,89 548,91 561,93 574,95 584,92 592,91 602,92 613,93 624,93 632,90 639,88 645,87 652,86 659,85 666,85 674,85 684,84 694,86 706,87 717,88 730,90 743,92 756,94 767,93 775,91 783,92 794,92 804,93 813,92 820,90 825,88 831,87 839,86 847,85 855,84 864,84 873,84 885,87 896,87 908,89 921,91 933,93 945,94 955,92 962,91 972,92 984,93 995,113' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,86 13,87 20,87 30,88 40,89 50,91 63,93 74,91 84,88 93,87 103,85 112,85 122,85 132,84 143,87 155,87 167,89 179,91 192,93 204,94 214,92 222,91 232,92 243,93 254,93 262,90 269,88 275,87 282,86 290,85 298,84 307,85 316,84 327,87 339,87 351,89 364,91 377,93 390,94 400,92 407,91 418,92 429,93 440,93 447,90 453,88 459,87 467,86 474,85 482,84 491,85 500,84 512,87 523,87 536,89 548,91 561,93 574,95 584,92 592,91 602,92 613,93 624,93 632,90 639,88 645,87 652,86 659,85 666,85 674,85 684,84 694,86 706,87 717,88 730,90 743,92 756,94 767,93 775,91 783,92 794,92 804,93 813,92 820,90 825,88 831,87 839,86 847,85 855,84 864,84 873,84 885,87 896,87 908,89 921,91 933,93 945,94 955,92 962,91 972,92 984,93 995,113 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ Men</h4>
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
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:08</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+3:13</td>
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
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>24:58</td>
            </ResultRow>
          </tbody>
        </ResultTable>
        <hr />
        <h3>#3 - Classique</h3>
        
<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'>
  
  
  <polyline points='7,93 12,94 20,94 28,94 38,95 47,95 56,95 64,95 71,94 80,94 89,94 100,94 112,95 124,95 135,95 145,95 156,95 166,95 176,94 186,94 196,94 205,93 215,93 225,93 233,92 240,91 250,91 260,92 270,91 280,91 291,91 301,91 311,92 321,92 332,91 342,92 354,93 366,93 378,94 390,94 402,95 414,95 425,95 435,94 445,94 453,94 463,95 474,95 485,95 496,95 506,95 517,95 528,95 537,94 547,94 557,94 568,93 578,93 588,93 596,91 603,91 613,92 623,92 633,91 643,91 653,91 663,91 672,92 682,92 692,91 702,92 713,93 724,93 736,94 749,94 761,95 773,95 784,95 794,94 803,94 812,94 822,94 832,95 843,95 854,95 865,95 876,95 887,95 897,94 908,94 919,94 929,93 940,94 950,92 958,91 968,91 980,92 995,93' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,93 12,94 20,94 28,94 38,95 47,95 56,95 64,95 71,94 80,94 89,94 100,94 112,95 124,95 135,95 145,95 156,95 166,95 176,94 186,94 196,94 205,93 215,93 225,93 233,92 240,91 250,91 260,92 270,91 280,91 291,91 301,91 311,92 321,92 332,91 342,92 354,93 366,93 378,94 390,94 402,95 414,95 425,95 435,94 445,94 453,94 463,95 474,95 485,95 496,95 506,95 517,95 528,95 537,94 547,94 557,94 568,93 578,93 588,93 596,91 603,91 613,92 623,92 633,91 643,91 653,91 663,91 672,92 682,92 692,91 702,92 713,93 724,93 736,94 749,94 761,95 773,95 784,95 794,94 803,94 812,94 822,94 832,95 843,95 854,95 865,95 876,95 887,95 897,94 908,94 919,94 929,93 940,94 950,92 958,91 968,91 980,92 995,93 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ Men</h4>
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
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>+1:22</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+1:37</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'>+2:46</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/7408043'><ResultAvatar src={pccAvatar} /></a><ResultRiderName>Suf Sav</ResultRiderName></td>
              <td width='100' align='center'>+7:55</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>8</td>
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
  
  
  <polyline points='7,93 14,93 25,93 37,93 49,93 60,93 71,93 82,93 93,93 103,92 114,93 126,93 139,95 151,95 162,95 173,95 184,95 194,94 203,93 211,93 221,93 231,92 240,92 250,92 261,93 271,93 281,93 292,93 301,93 311,93 320,93 331,93 341,93 351,93 361,93 370,92 380,93 390,93 401,94 414,95 426,95 437,95 447,95 457,95 466,94 474,93 482,93 491,93 500,92 509,92 519,92 529,93 540,93 550,93 560,93 570,93 580,93 590,93 600,93 610,93 619,93 629,93 639,93 648,92 658,93 668,93 679,95 691,95 702,95 712,95 721,95 731,95 740,93 747,93 756,93 765,93 774,92 783,92 792,92 802,93 812,93 822,93 832,93 843,93 852,93 862,93 871,93 881,93 891,93 900,93 909,93 918,92 928,93 938,93 949,94 960,95 971,95 981,95 995,95' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M7,93 14,93 25,93 37,93 49,93 60,93 71,93 82,93 93,93 103,92 114,93 126,93 139,95 151,95 162,95 173,95 184,95 194,94 203,93 211,93 221,93 231,92 240,92 250,92 261,93 271,93 281,93 292,93 301,93 311,93 320,93 331,93 341,93 351,93 361,93 370,92 380,93 390,93 401,94 414,95 426,95 437,95 447,95 457,95 466,94 474,93 482,93 491,93 500,92 509,92 519,92 529,93 540,93 550,93 560,93 570,93 580,93 590,93 600,93 610,93 619,93 629,93 639,93 648,92 658,93 668,93 679,95 691,95 702,95 712,95 721,95 731,95 740,93 747,93 756,93 765,93 774,92 783,92 792,92 802,93 812,93 822,93 832,93 843,93 852,93 862,93 871,93 881,93 891,93 900,93 909,93 918,92 928,93 938,93 949,94 960,95 971,95 981,95 995,95 995,100 5,100' fill='#9ea1ad' />
</svg>

        <h4>⏱️ Men</h4>
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
              <td width='100' align='center'>19:41</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>2</td>
              <td ><a href='https://www.strava.com/athletes/33356430'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/33356430/9918290/16/medium.jpg' /></a><ResultRiderName>Matt W. (Peckham CC/DIRT)</ResultRiderName></td>
              <td width='100' align='center'>+1:44</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>3</td>
              <td ><a href='https://www.strava.com/athletes/23246312'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/23246312/9895114/1/medium.jpg' /></a><ResultRiderName>Will Bennett</ResultRiderName></td>
              <td width='100' align='center'>+2:05</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>4</td>
              <td ><a href='https://www.strava.com/athletes/870759'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/870759/6038555/3/medium.jpg' /></a><ResultRiderName>Lawrence Jenkin</ResultRiderName></td>
              <td width='100' align='center'>+2:09</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>5</td>
              <td ><a href='https://www.strava.com/athletes/14118007'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/14118007/7293533/4/medium.jpg' /></a><ResultRiderName>Leo Hemsted</ResultRiderName></td>
              <td width='100' align='center'>+2:13</td>
            </ResultRow>
            <ResultOddRow>
              <td width='100' align='center'>6</td>
              <td ><a href='https://www.strava.com/athletes/718104'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/718104/962882/4/medium.jpg' /></a><ResultRiderName>Andy Marsden</ResultRiderName></td>
              <td width='100' align='center'>+2:14</td>
            </ResultOddRow>
            <ResultRow>
              <td width='100' align='center'>7</td>
              <td ><a href='https://www.strava.com/athletes/3873678'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/3873678/2143920/1/medium.jpg' /></a><ResultRiderName>James Russell</ResultRiderName></td>
              <td width='100' align='center'>+4:14</td>
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
              <td width='100' align='center'>22:16</td>
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

        <h4>⏱️ Men</h4>
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
              <td ><a href='https://www.strava.com/athletes/16378742'><ResultAvatar src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/16378742/6053522/2/medium.jpg' /></a><ResultRiderName>Jemma Adams</ResultRiderName></td>
              <td width='100' align='center'>23:11</td>
            </ResultRow>
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

