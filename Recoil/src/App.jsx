/* eslint-disable no-unused-vars */
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import "./App.css";
import {
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationsAtom,
  totalNotificationSelector,
} from "./atoms";
import { useMemo } from "react";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const networkAtomCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const [messagingAtomCount, setMessagingAtomCount] =
    useRecoilState(messagingAtom);
  const notificationsAtomCount = useRecoilValue(notificationsAtom);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  /* const finalValue = useMemo(() => {
    return networkAtomCount + jobsAtomCount + messagingAtomCount + notificationsAtomCount;
  }, [networkAtomCount, jobsAtomCount, messagingAtomCount, notificationsAtomCount]); */

  return (
    <>
      <h2>Recoil Tutorial</h2>
      <button>Home</button>

      <button>
        My Network ({networkAtomCount >= 100 ? "99+" : networkAtomCount})
      </button>
      <button>Jobs ({jobsAtomCount >= 100 ? "99+" : jobsAtomCount})</button>
      <button>
        Messaging ({messagingAtomCount >= 100 ? "99+" : messagingAtomCount})
      </button>
      <button>
        Notifications (
        {notificationsAtomCount >= 100 ? "99+" : notificationsAtomCount})
      </button>

      <button>Me ({totalNotificationCount})</button>
    </>
  );
}

export default App;
