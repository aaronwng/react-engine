import { Mention } from 'antd';
const { toString, toEditorState } = Mention;
import React from 'react'

import { connect } from 'utils/ecos'


function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

let MentionBox = ({dispatch,reduxState}) =>(
  <Mention
    style={{ width: '100%', height: 100 }}
    onChange={(editorState)=>{
      debugger
  	  dispatch({
  	  	type: 'setText'
  	  	,payload: toString(editorState)
  	  })
    }}
    value={toEditorState(reduxState)}
    suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
    onSelect={onSelect}
  />)

export default connect(require('./model'))(MentionBox)