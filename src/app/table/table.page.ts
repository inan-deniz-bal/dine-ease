import { Component, OnInit } from '@angular/core';
import { Table } from 'src/types/tableType';
import { Menu } from 'src/interfaces/menu';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  table: Table = {
    tableName: '',
  };
  menu: Menu[] = [];
  constructor(
    private serverH: ServerHandlerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // Eğer veri NavigationExtras aracılığıyla aktarıldıysa state içinde olur
      const data = window.history.state.data;
      if (data) {
        //this.table = data.table;
        this.menu = data.menu;
        // İşlemlerinizi burada yapabilirsiniz
      } else {
        // Veri NavigationExtras ile aktarılmadıysa, servis veya başka bir kaynaktan alabilirsiniz
      }
    });
  }
}
