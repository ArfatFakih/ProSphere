import { 
  AcceptConnection, 
  getMyConnectionRequests, 
  getConnectionsRequest 
} from '@/config/redux/action/authAction'

import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { BASE_URL } from '@/config'
import { useRouter } from 'next/router'

const MyConnectionsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMyConnectionRequests({ token }));
      dispatch(getConnectionsRequest({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("Pending Requests:", authState.connectionRequest);
    console.log("Connections:", authState.connections);
  }, [authState.connectionRequest, authState.connections]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.7rem"}}>
          
          <h2>My Connections</h2>

          {authState.connectionRequest.filter((c) => c.status_accepted === null).length === 0 && (
            <h1>No Connection Request Pending</h1>
          )}

          {authState.connectionRequest
            .filter((connection) => connection.status_accepted === null)
            .map((user, index) => (
              <div
                onClick={() => router.push(`/view_profile/${user.userId.username}`)}
                className={styles.userCard}
                key={index}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div className={styles.profilePicture}>
                    <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                  </div>
                  <div className={styles.userInfo}>
                    <h3>{user.userId.name}</h3>
                    <p>{user.userId.username}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        AcceptConnection({
                          requestId: user._id,
                          token: localStorage.getItem("token"),
                          action: "accept",
                        })
                      );
                    }}
                    className={styles.connectedButton}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}

      
          <h2>My Network</h2>
          {[
            ...authState.connections.map((c) => ({
              id: c.connectionId._id,
              name: c.connectionId.name,
              username: c.connectionId.username,
              profilePicture: c.connectionId.profilePicture,
            })),
            ...authState.connectionRequest
              .filter((c) => c.status_accepted === true)
              .map((c) => ({
                id: c.userId._id,
                name: c.userId.name,
                username: c.userId.username,
                profilePicture: c.userId.profilePicture,
              })),
          ].map((user, index) => (
            <div
              onClick={() => router.push(`/view_profile/${user.username}`)}
              className={styles.userCard}
              key={index}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                <div className={styles.profilePicture}>
                  <img src={`${BASE_URL}/${user.profilePicture}`} alt="" />
                </div>
                <div className={styles.userInfo}>
                  <h3>{user.name}</h3>
                  <p>{user.username}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </DashboardLayout>
    </UserLayout>
  )
}

export default MyConnectionsPage
