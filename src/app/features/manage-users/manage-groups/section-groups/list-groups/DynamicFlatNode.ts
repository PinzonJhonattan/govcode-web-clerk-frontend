import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";

export class DynamicFlatNode {
  constructor(
    public item: GroupItem,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}
