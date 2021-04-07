import React from "react";
import "./ResourcePoolContent.css"
import logo from "../../../assets/recource_pool.png"
import backicon from "../../../assets/backicon.png"
import rsc1 from "../../../assets/resource1.png"

interface Props {
    stage: number
    data: any
}

interface State {
  resourceId: number
  type: string
}

export default class ResourcePoolContent extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            resourceId: 0,
            type:"list",
        }
    }

    handleClickRsc(rid) {
        if(rid < this.props.stage) {
            this.setState({
                resourceId:rid,
                type:"detail",
            })
        }   
    }

    handleClickBackIcon() {
        this.setState({
            resourceId:0,
            type:"list",
        })
    }

    componentDidMount() {
        console.log(this.state)
        console.log(this.props)
    }

    currentContent() {
        switch (this.state.type) {
            case "list": {  
                // 计算需要展示的卡片及其状态
                const rscToShow:any = []
                for (let i = 1; i < this.props.data.length; i++) {
                    let flag = 4
                    if (this.props.stage > this.props.data[i].stage_id) {
                        flag = 3
                    }
                    rscToShow.push(
                        <ResourceCard 
                            key={this.props.data[i].rid} 
                            name = {this.props.data[i].name} 
                            access_flag = {flag} 
                            onClick={(rid)=>this.handleClickRsc(this.props.data[i].stage_id)}
                            className=""
                        />
                    )
                }
                return (
                    <div>
                        <div className="d-flex flex-row ">
                            <img className="list-logo" src={logo} alt="logo"/>
                            <h2 className="ml-20">资源库</h2>
                        </div>
            
                        <div className="d-flex flex-row flex-wrap justify-content-start mt-40">
                            {rscToShow}
                        </div>
                    </div>
                )
            }
            case "detail": {
                let name = ""
                for (let i = 1; i < this.props.data.length; i++) {
                    if(this.props.data[i].rid === this.state.resourceId) {
                        name = this.props.data[i].name
                    }
                }
                return (
                    <div>
                        <div className="d-flex flex-row rsc-top-bar">
                       
                            <img className="back-icon" src={backicon} alt="backlogo" onClick={()=>this.handleClickBackIcon()}/>

                            <h2 className="ml-20">资源库</h2>
                            <span className="recource-title">{name}</span>
                        </div>
                        
                        {/* 空白 */}
                        <div className="mt-40"/>

                        <div className="resource-content">
                            <img className="resource-img" src={rsc1} alt="资源"/>
                        </div>
                        
                    </div>
                    
                )
            }
        }
    }
    
    render() {
        return(
            <div> {this.currentContent()} </div>
        )   
    }

}

// 资源卡片
function ResourceCard(props) {
    return (
        <div>
            <button className="recource-card text-center ml-40 mt-10" onClick ={()=>props.onClick()}> 
                <h3 className="text-center">{props.name}</h3>
                <div className="resource-status-position">
                    <ResourceStatusBtn access_flag={props.access_flag }/>
                </div>
                
            </button>
        </div>
    );
}

// 完成状态按钮
function ResourceStatusBtn(props) {
    switch (props.access_flag) {
         case 1: {
            return (
                <div className="resource-status-finished-background">
                    <span className="resource-status-finished-font">已完成</span>
                </div>
            )
         }
         case 2: {
            return(
                <div className="resource-status-doing-background">
                    <span className="resource-status-doing-font">进行中</span>
                </div>
            )
         }
         case 3: {
            return(
                <div className="d-flex flex-row example-status">
                    <span>范例 &nbsp; 已解锁</span>
                </div>
            )
         }
         case 4: {
            return(
                <div className="d-flex flex-row example-status">
                    <span>范例 &nbsp; 未解锁</span>
                </div>
            )
         }
    } 

}

