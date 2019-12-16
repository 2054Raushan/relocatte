/* eslint-disable linebreak-style */
import React from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setCommonDrawerVisibility } from '../../redux/CommonActions';

const CommonDrawer = () => {
    const {
        title, visible, body,
    } = useSelector(state => state.commonReducer.commonDrawer);
    const dispatch = useDispatch();
    return (
        <Drawer
            title={title}
            placement="right"
            closable
            onClose={() => dispatch(setCommonDrawerVisibility({ visible: false }))}
            visible={visible}
        >
            {body}
        </Drawer>
    );
};

CommonDrawer.propTypes = {
};

CommonDrawer.defaultProps = {
};

export default CommonDrawer;
