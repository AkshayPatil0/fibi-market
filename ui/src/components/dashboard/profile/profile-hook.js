import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getProfile, setUser } from "../../../store/actions/auth";

import * as api from "../../../api";

export function useProfileHook() {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const Router = useHistory();
  useEffect(() => {
    if (!user) {
      Router.push("/auth/signin");
    }
  });
  const updateProfile = async (formData) => {
    if (formData.avatar) {
      var fData = new FormData();
      fData.set("avatar", formData.avatar);
      try {
        await api.updateProfileAvatar(fData);
      } catch (err) {
        console.error(err);
      }
    }
    try {
      const res = await api.updateProfile(formData);
      dispatch(setUser(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAvatar = async () => {
    try {
      await api.deleteProfileAvatar();
    } catch (err) {
      console.error(err);
    }
  };
  return {
    user,
    updateProfile,
    deleteAvatar,
  };
}
