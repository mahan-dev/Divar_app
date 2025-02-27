import React from 'react';
import AddPost from '../Templates/AddPost';
import PostLists from '../Templates/PostLists';

const Dashboard = () => {

    return (
        <section className='font-medium'>
            <AddPost />
            <PostLists />
        </section>
    );
};

export default Dashboard;