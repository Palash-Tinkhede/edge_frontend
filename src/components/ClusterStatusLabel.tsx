import type React from "react";
import { Label, Popover } from "@patternfly/react-core";

export type Cluster = {
  status: string; // allow any string from backend
};

const statusMap: Record<
  string,
  {
    color: React.ComponentProps<typeof Label>["color"];
    description: string;
  }
> = {
  running: {
    color: "green",
    description: "all nodes are online and some nodes have quorum",
  },
  degraded: {
    color: "gold",
    description: "some (not all) nodes are online and some nodes have quorum",
  },
  inoperative: {
    color: "orange",
    description:
      "not considered running or degraded but some nodes are online or standby",
  },
  offline: { color: "red", description: "all nodes are offline" },
  unknown: {
    color: "grey",
    description: "some nodes are unknown, the rest is offline",
  },
};

export const ClusterStatusLabel = (props: {
  status: Cluster["status"] | string;
  "data-test": string;
}) => {
  const safeStatus = statusMap[props.status as keyof typeof statusMap]
    ? props.status
    : "unknown";

  return (
    <Popover
      headerContent={"Cluster status summary (meaning)"}
      bodyContent={Object.entries(statusMap).map(
        ([status, { color, description }]) => (
          <div key={status}>
            <Label color={color} isCompact>
              {status}
            </Label>
            {` ${description}`}
          </div>
        )
      )}
    >
      <Label
        color={statusMap[safeStatus].color}
        isCompact
        data-test={props["data-test"]}
      >
        {safeStatus}
      </Label>
    </Popover>
  );
};
;

