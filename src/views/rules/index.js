import React, { useEffect } from 'react';
import axios from 'axios';
import bgIMG from './imgs/bg.jpg';
import { Link } from 'react-router-dom';
import './index.less';
//function MyApp(props) {
    //console.log('entry page /rules ========================= start');
    //console.log('page rules props: ', props);

    //useEffect(() => {
        //console.log('useEffect==================in /rules')
        //console.log('entry page /rules ========================= end ');
    //})

    //return (
        //<div className="container rules-wrap">
            //<div className="content">
                //<Link to="/xxx">to xxx</Link>
                //<img src={bgIMG} style={{ width: 10 }}/>
                //<div className="rule-list">
                    //<p>用户首次通关任意关卡，即可参与当天的打卡。重复挑战已通关关卡不能参与打卡；</p>
                    //<p>每周一到周日，每天均完成打卡，即可参与平分当周奖金；</p>
                    //<p>每周日晚上12点截止当周的打卡，系统会自动计算本周符合奖金平分资格的用户，并自动将奖金发放至用户帐户；</p>
                    //<p>每周一重新开启打卡活动，用户需从周一重新开始打卡；</p>
                    //<p>若用户当天没有打卡，可以在之后进行补签，每次补签需要花费200钻石；</p>
                    //<p>本活动最终解释权归比特星光科技有限公司所有。</p>
                //</div>

            //</div>

        //</div>
    //)
//}


class MyApp extends React.Component {
    componentDidMount() {
        console.log('rules didMount...')
    }
    render() {
        console.log('rules render...')
        return (
            <div className="container rules-wrap">
                <div className="content">
                    <div className="rule-list">
                        <p>用户首次通关任意关卡，即可参与当天的打卡。重复挑战已通关关卡不能参与打卡{Math.random()}</p>
                        <p>每周一到周日，每天均完成打卡，即可参与平分当周奖金；</p>
                        <p>每周日晚上12点截止当周的打卡，系统会自动计算本周符合奖金平分资格的用户，并自动将奖金发放至用户帐户；</p>
                        <p>每周一重新开启打卡活动，用户需从周一重新开始打卡；</p>
                        <p>若用户当天没有打卡，可以在之后进行补签，每次补签需要花费200钻石；</p>
                        <p>本活动最终解释权归比特星光科技有限公司所有。</p>
                    </div>

                </div>

            </div>
        )
    }
}

MyApp.getInitialProps = function () {
    return Promise.resolve("1111");
}

export default MyApp;

