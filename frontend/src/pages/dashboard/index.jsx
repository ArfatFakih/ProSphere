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


    const [postContent, setPostContent] = useState("");
    const [fileContent, setFileContent] = useState();

    if(authState.user) {
        return (
          <UserLayout>
            <DashboardLayout>
              <div className={styles.scrollComponent}>

                <div className={styles.createPostContainer}>
                  <img className={styles.userProfile} src={`${BASE_URL}/${authState.user.userId.profilePicture}`} alt="" />
                  <textarea onChange={(e) => setPostContent(e.target.value)} value={postContent} placeholder={"What's in your mind"} className={styles.textAreaOfContent} name="" id=""></textarea>
                  <label htmlFor="fileUpload">
                    <div className={styles.Fab}>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>

                    </div>
                  </label>
                  <input onChange={(e) => setFileContent(e.target.files[0])} type="file" hidden id="fileUpload" />

                  {postContent.length > 0 && 
                  <div className={styles.uploadButton}>Post</div> 
                  }
                  
                </div>

              </div>
            </DashboardLayout>
          </UserLayout>
        )
    }else {
      return (
        <UserLayout>
          <DashboardLayout>
            <div>
              <h1>Loading...</h1>
            </div>
          </DashboardLayout>
        </UserLayout>
      )
    }
}

export default Dashboard