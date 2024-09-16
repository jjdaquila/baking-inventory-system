<nav
  class="sidebar text-[#68411b] dark:text-white bg-white dark:bg-[#1f2937]">

  <div id="btnDashboard"
    class="inline-flex hover:bg-[#f9e4ad] rounded py-2 hover:text-black transition-transform transform hover:translate-x-1">
    <div class="w-[40px] align-middle">
      <i class="fas fa-home p-2"></i>
    </div>
    <a class="flex items-center">Dashboard</a>
  </div>

  <div id="btnRawMaterialList"
    class="inline-flex hover:bg-[#965c5b] rounded py-2 hover:text-white transition-transform transform hover:translate-x-1">
    <div class="w-[40px] align-middle">
      <i class="fas fa-cogs p-2"></i>
    </div>
    <a class="flex items-center">Raw Material List</a>
  </div>

  <div id="btnDailyPlannedProduction"
    class="inline-flex hover:bg-[#b0b980] rounded py-2 hover:text-white transition-transform transform hover:translate-x-1">
    <div class="w-[40px] align-middle">
      <i class="fas fa-calendar-day p-2"></i>
    </div>
    <a class="flex items-center">Daily Planned Production</a>
  </div>

  <div id="btnFinishedProductList"
    class="inline-flex hover:bg-[#e4ac4f] rounded py-2 hover:text-white transition-transform transform hover:translate-x-1">
    <div class="w-[40px] align-middle">
      <i class="fa fa-list-alt p-2"></i>
    </div>
    <a class="flex items-center">Finished Product List</a>
  </div>

  <div id="btnDispatching"
    class="inline-flex hover:bg-[#fd5d18] rounded py-2 hover:text-white transition-transform transform hover:translate-x-1">
    <div class="w-[40px] align-middle">
      <i class="fas fa-truck p-2"></i>
    </div>
    <a class="flex items-center">Dispatching</a>
  </div>

  <div class="my-2">
    <div class="inline-flex">
      <div class="w-[40px] align-middle ">
        <i class="fas fa-file-alt p-2"></i>
      </div>
      <button id="dropdownButtonReport">Report Generation <i id="dropdownIconReport"
          class="fas fa-angle-down ml-1"></i>
      </button>
    </div>
    <ul id="dropdownMenuReport"
      class="bg-base-100 rounded-box z-[1] w-68 p-2 hidden">
      <li><a id="btnReportFinished"
        class="hover:bg-[#f95757] hover:text-white transition-transform transform hover:translate-x-1">Finished
          Inventory</a></li>
      <li><a id="btnReportPlanned"
        class="hover:bg-[#f95757] hover:text-white transition-transform transform hover:translate-x-1">Planned
          Raw Materials Inventory</a></li>
      <li><a id="btnReportProduction"
        class="hover:bg-[#f95757] hover:text-white transition-transform transform hover:translate-x-1">Production
          Report</a></li>
      <li><a id="btnReportReceived"
        class="hover:bg-[#f95757] hover:text-white transition-transform transform hover:translate-x-1">Received
          Inventory Report</a></li>
    </ul>
  </div>

  <div class="my-2">
    <div class="inline-flex">
      <div class="w-[40px] align-middle">
        <i class="fas fa-tools p-2"></i>
      </div>
      <button id="dropdownButtonMaintenance">
        Maintenance <i id="dropdownIconMaintenance"
          class="fas fa-angle-down ml-1"></i>
      </button>
    </div>
    <ul id="dropdownMenuMaintenance"
      class="bg-base-100 rounded-box z-[1] w-68 p-2 hidden">
      <li><a id="btnDispatch"
        class="hover:bg-[#7db7ce] hover:text-white transition-transform transform hover:translate-x-1">Dispatch
          Types</a></li>
      <li><a id="btnBranches"
        class="hover:bg-[#7db7ce] hover:text-white transition-transform transform hover:translate-x-1">Branches</a></li>
      <li><a id="btnSkuCodes"
        class="hover:bg-[#7db7ce] hover:text-white transition-transform transform hover:translate-x-1">SKU
          Codes</a></li>
      <li><a id="btnMaterialCodes"
        class="hover:bg-[#7db7ce] hover:text-white transition-transform transform hover:translate-x-1">Material
          Codes</a></li>
      <li><a id="btnUserMaintenance"
        class="hover:bg-[#7db7ce] hover:text-white transition-transform transform hover:translate-x-1">User
          Maintenance</a></li>
    </ul>
  </div>
</nav>

<script src="js/nav_dropdown.js"></script>