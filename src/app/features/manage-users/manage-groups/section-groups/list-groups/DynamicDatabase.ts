import {Injectable} from "@angular/core";
import {DynamicFlatNode} from "@features/manage-users/manage-groups/section-groups/list-groups/DynamicFlatNode";
import {ManageGroupsClerkService} from "@features/manage-users/manage-groups/services/manage-groups.service";
import {GroupItem} from "@features/manage-users/manage-groups/models/groups.model";
import {firstValueFrom} from "rxjs";

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {

  constructor(private manageClerkGroups : ManageGroupsClerkService) {
  }
  dataMap = new Map<string, string[]>([]);

  /** Initial data from database */
  async initialData() {
    try {
      this.dataMap = new Map<string, string[]>();
      const rootGroupsResponse = await firstValueFrom(this.manageClerkGroups.getRootGroups())
      const rootGroups = rootGroupsResponse.map(groupItem => {
        this.dataMap.set(groupItem.name, []);
        return new DynamicFlatNode(groupItem, 0, true)
      });
      return rootGroups;
    } catch (error) {
      throw new Error('Error al cargar los grupos iniciales')
    }
  }

  async getChildren(node : DynamicFlatNode): Promise<GroupItem[]> {
    try {
      const childrenGroupResponse = await firstValueFrom(this.manageClerkGroups.getChildrenGroups(node.item.id))
      const response = childrenGroupResponse.map(children => {
        this.dataMap.delete(children.name)
        if(children.subGroupCount > 0){
          this.dataMap.set(children.name, []);
        }
        return children
      });
      return response

    }catch (error){
      throw new Error('Error al cargar los grupos hijo')
    }
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
