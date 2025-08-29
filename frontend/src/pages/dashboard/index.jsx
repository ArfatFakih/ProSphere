import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';
import UserLayout from '../../layout/UserLayout';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './index.module.css'
import { BASE_URL } from '@/config';

const Dashboard = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);

    useEffect(() => {
      if(authState.isTokenThere) {
        dispatch(getAllPosts());
        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
      }

      if(!authState.all_profiles_fetched) {
        dispatch(getAllUsers());
      }

    },[authState.isTokenThere])

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.scrollComponent}>

          <div className={styles.createPostContainer}>
            <img width={100} src={`${BASE_URL}/${authState.user.userId.profilePicture}`} alt="" />
          </div>

        </div>
      </DashboardLayout>
    </UserLayout>
  )
}

export default Dashboard