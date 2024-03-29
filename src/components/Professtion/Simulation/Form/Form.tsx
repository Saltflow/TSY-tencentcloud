/* eslint-disable max-params */
import React, { FC, memo, useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'

import { PageResult } from './../Result/PageResult'
import StandardTip from './../../StandardTip/StandardTip'

import update from 'immutability-helper'

import './Form.scss'

interface Props {
    data: any
    handleNext: () => void
}

export const Form: FC<Props> = memo(function Form({ data, handleNext }) {
    const [columns, setColumns] = useState(data.columns)
    const [grid, setGrid] = useState(data.grid)
    const [answer, setAnswer] = useState(data.answer)
    const [pass, setPass] = useState(false)
    const [showStandardTip, setShowStandardTip] = useState(false)
    function getType(type: string) {
        switch (type) {
            case 'select':
                return Type.SELECT
        }
    }

    useEffect(() => {
        setColumns(data.columns)
        setGrid(data.grid)
        setAnswer(data.answer)
    }, [data])

    function formEqual(object1: any, object2: any) {
        const keys1 = Object.keys(object1)
        const keys2 = Object.keys(object2)

        if (keys1.length !== keys2.length) {
            return false
        }

        for (const key of keys1) {
            const val1 = object1[key]
            const val2 = object2[key]
            if (val1 !== '' && val1 !== val2) {
                return false
            }
            // 不允许提交的答案有空白
            if (val2 === '')
                return false
        }

        return true
    }

    

    function afterSaveCell(oldValue: any, newValue: any, row: any) {
        console.log('grid', grid)
        console.log('answer', answer)
        let equal = true
        for (let i in answer) {
            if (answer.hasOwnProperty(i)) {
                equal = equal && formEqual(answer[i], grid[i])
            }
        }
        setPass(equal)
    }

    function placeholderStyle(cell, row, rowIndex, colIndex){
        if(cell === "请描述用户对该功能的态度及原因" || cell === "下拉菜单选择  ▼") {
            return {
                color: "#C4C4C4"
            }
        }
        else{
            return {
                    width: "300px",
                    height: "105px",
                    fontSize: "16px"
            }
        }
    }

    const newCols = columns.map((cols, idx) => {
        let newcols = cols;
        newcols.style = placeholderStyle
        return newcols
    })

    function handleCheck() {}

    if (data.columns) {
        return (
            <div className="mt-40">
                <BootstrapTable
                    keyField="id"
                    data={grid}
                    columns={columns}
                    cellEdit={cellEditFactory({ mode: 'click', blurToSave: true, nonEditableRows: () => [0], afterSaveCell })}
                    headerClasses={data.headerClass ? data.headerClass : 'header-class'}
                />
                <PageResult
                    checked={pass}
                    handleNext={handleNext}
                    resultMsg={data.resultMsg ? data.resultMsg : ''}
                    handleCheck={handleCheck}
                    setShowStandardTip={setShowStandardTip}
                />
                {showStandardTip?<StandardTip standardMsg={data.resultMsg.standardMsg}/>:<div/>}
                <button
                    onClick={handleNext}
                    type="submit"
                    className="btn btn-blue"
                    style={{ position: 'fixed', top: '85%', left: '90%' }}
                >
                    Skip
                </button>
            </div>
        )
    } else {
        return (
            <button
                onClick={handleNext}
                type="submit"
                className="btn btn-blue"
                style={{ position: 'fixed', top: '85%', left: '90%' }}
            >
                Skip
            </button>
        )
    }
})
