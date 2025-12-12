import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { NotificationDto } from "./types";
import type { RootState } from "@/redux/store";

const notificationsAdapter = createEntityAdapter({
  selectId: (n: NotificationDto) => n._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    upsertManyNotifications(state, action: PayloadAction<NotificationDto[]>) {
      notificationsAdapter.upsertMany(state, action.payload);
    },
    addNotification(state, action: PayloadAction<NotificationDto>) {
      notificationsAdapter.addOne(state, action.payload);
    },
    markNotificationRead(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      notificationsAdapter.updateOne(state, { id, changes: { isRead: true } });
    },
    removeNotification(state, action: PayloadAction<{ id: string }>) {
      notificationsAdapter.removeOne(state, action.payload.id);
    },
    markAllReadLocal(state) {
      const allIds = Object.keys(state.entities) as string[];
      allIds.forEach((id) => {
        notificationsAdapter.updateOne(state, {
          id,
          changes: { isRead: true },
        });
      });
    },
    clearNotifications(state) {
      notificationsAdapter.removeAll(state);
    },
  },
});

export const {
  upsertManyNotifications,
  addNotification,
  markNotificationRead,
  removeNotification,
  markAllReadLocal,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectTotal: selectNotificationsTotal,
} = notificationsAdapter.getSelectors<RootState>(
  (state) => state.notifications
);
