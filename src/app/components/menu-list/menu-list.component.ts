import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Mantenedor } from './clases';
const TREE_DATA: Mantenedor[] = [
  {
    name: 'Mantenedor 1',
    ruta: '/mantenedor-1',
    children: [
      { name: 'Tipo documento', ruta: 'inmueble/nuevo' },
      { name: 'Tipo contrato', ruta: '/submantenedor-2' }
    ]
  },
  {
    name: 'Mantenedor 2',
    ruta: '/mantenedor-2',
    children: [
      { name: 'Submantenedor 3', ruta: '' },
      { name: 'Submantenedor 4', ruta: '/submantenedor-4' }
    ]
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  private _transformer = (node: Mantenedor, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  @Output() menuToggle = new EventEmitter<void>();

  @Input() isAuthorized !: boolean | null;

  @Output() signOut = new EventEmitter<void>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
  }

  closeMenu() : void {
    this.menuToggle.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }


}
