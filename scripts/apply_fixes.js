const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../components/AdminPanel.jsx');
let raw = fs.readFileSync(targetPath, 'utf8');
const hasCRLF = raw.includes('\r\n');
let content = raw.replace(/\r\n/g, '\n');

console.log('Original length (normalized):', content.length, 'hasCRLF:', hasCRLF);

// Helper function to safely apply replace
function applyReplace(label, target, replacement) {
  const normTarget = target.replace(/\r\n/g, '\n');
  const normReplacement = replacement.replace(/\r\n/g, '\n');

  if (content.includes(normReplacement)) {
    console.log(`[ALREADY APPLIED] ${label}`);
    return;
  }
  if (!content.includes(normTarget)) {
    console.error(`[ERROR] Target for "${label}" not found!`);
    const firstLine = normTarget.trim().split('\n')[0];
    console.log('First line looking for:', JSON.stringify(firstLine));
    process.exit(1);
  }
  content = content.replace(normTarget, normReplacement);
  console.log(`[SUCCESS] ${label}`);
}

// FIX 1: Orders Desk Table Blinking NEW badge
const target1 = `                                  {/* 3. Order ID & 4. Date & Time */}
                                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                                    <button
                                      type="button"
                                      onClick={(e) => { e.stopPropagation(); setActiveActionStep(1); setViewingOrder(o); }}
                                      className="font-mono text-xs font-black text-slate-900 bg-slate-100 group-hover:bg-white hover:border-rose-300 hover:text-rose-700 px-2 py-0.5 rounded-md border border-slate-200/80 inline-block transition-all cursor-pointer text-left shadow-2xs"
                                      title="Open Order Details"
                                    >
                                      #{o.id}
                                    </button>`;

const replacement1 = `                                  {/* 3. Order ID & 4. Date & Time */}
                                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                                    <button
                                      type="button"
                                      onClick={(e) => { e.stopPropagation(); setActiveActionStep(1); setViewingOrder(o); }}
                                      className="font-mono text-xs font-black text-slate-900 bg-slate-100 group-hover:bg-white hover:border-rose-300 hover:text-rose-700 px-2 py-0.5 rounded-md border border-slate-200/80 inline-flex items-center gap-1.5 transition-all cursor-pointer text-left shadow-2xs"
                                      title="Open Order Details"
                                    >
                                      <span>#{o.id}</span>
                                      {o.status === 'Pending' && (
                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider shadow-2xs ring-1 ring-rose-400/60 animate-pulse">
                                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                          <span>NEW</span>
                                        </span>
                                      )}
                                    </button>`;

applyReplace('Fix 1: Orders Desk Blinking NEW Badge', target1, replacement1);

// FIX 2: Order Detail Modal Header Blinking NEW Badge
const target2 = `                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    Order #{viewingOrder.id}
                  </span>`;

const replacement2 = `                <div className="flex items-center gap-2.5 flex-wrap">
                  {viewingOrder.status === 'Pending' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm ring-2 ring-rose-400/60 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>🚨 NEW ORDER</span>
                    </span>
                  )}
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    Order #{viewingOrder.id}
                  </span>`;

applyReplace('Fix 2: Modal Header Blinking NEW Badge', target2, replacement2);

// FIX 3: Top Execution Action Command Bar Subtitle and Buttons
const target3 = `                  <p className="text-xs sm:text-sm font-black text-white">
                    {!isOrderAccepted(viewingOrder) && viewingOrder.status !== 'Cancelled' && viewingOrder.status !== 'Delivered'
                      ? 'Action Required: Review order & click Accept or Decline'
                      : isOrderAccepted(viewingOrder) && viewingOrder.status !== 'Ready for Pickup' && viewingOrder.stage !== 'ready_for_pickup' && viewingOrder.status !== 'In Transit' && viewingOrder.status !== 'Dispatched' && viewingOrder.status !== 'Delivered' && viewingOrder.status !== 'Cancelled'
                      ? 'In Preparation: Items crafting. Click below once packed:'
                      : (viewingOrder.status === 'Ready for Pickup' || viewingOrder.stage === 'ready_for_pickup')
                      ? (isIndore ? 'Items Ready: Dispatch Self-Pickup (Rapido/Porter/Uber) with Dual OTPs' : 'Items Ready: Dispatch Platform Courier Shipping')
                      : viewingOrder.status === 'In Transit' || viewingOrder.status === 'Dispatched'
                      ? \`Out for Delivery (\${viewingOrder.logistics?.provider || 'Rider'}). Ask customer for Drop OTP\`
                      : viewingOrder.status === 'Delivered'
                      ? 'Handover Completed & Verified with Customer Drop OTP'
                      : 'Order Cancelled'}
                  </p>
                </div>
              </div>

              {/* Right: Action Buttons (In ONE ROW at top) */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* 1. Pending / Unaccepted -> Accept & Reject button */}
                {!isOrderAccepted(viewingOrder) && viewingOrder.status !== 'Cancelled' && viewingOrder.status !== 'Delivered' && (
                  <>
                    <button
                      type="button"
                      onClick={async () => {
                        if (orderModalPerspective === 'admin' || !viewingOrder.assignedVendorId) {
                          await handleConfirmOrder(viewingOrder.id);
                        } else {
                          await handleUpdateStatus(viewingOrder.id, 'Accepted');
                          setViewingOrder(prev => prev ? ({ ...prev, status: 'Accepted', assignmentAccepted: true, acceptedAt: new Date().toISOString() }) : null);
                          showToast('Order accepted! Please begin item preparation.');
                        }
                      }}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <CheckCircle size={15} />
                      <span>Accept &amp; Confirm Order</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (orderModalPerspective === 'admin') {
                          handleOpenAdminCancelModal(viewingOrder);
                        } else {
                          handleOpenVendorRejectModal(viewingOrder);
                        }
                      }}
                      className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/50 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <XCircle size={15} />
                      <span>Decline</span>
                    </button>
                  </>
                )}

                {/* 2. Accepted -> Mark Ready For Pickup button */}
                {isOrderAccepted(viewingOrder) && viewingOrder.status !== 'Ready for Pickup' && viewingOrder.stage !== 'ready_for_pickup' && viewingOrder.status !== 'In Transit' && viewingOrder.status !== 'Dispatched' && viewingOrder.status !== 'Delivered' && viewingOrder.status !== 'Cancelled' && (
                  <>
                    <button
                      type="button"
                      onClick={async () => {
                        await handleMarkReadyForPickup(viewingOrder.id);
                      }}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer animate-pulse"
                    >
                      <Package size={16} />
                      <span>Mark Ready For Pickup</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenVendorRejectModal(viewingOrder)}
                      className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>Decline</span>
                    </button>
                  </>
                )}`;

const replacement3 = `                  <p className="text-xs sm:text-sm font-black text-white">
                    {isFreshPending(viewingOrder)
                      ? 'Action Required: Review order & click Accept or Decline'
                      : isAwaitingWorkshopAssignment(viewingOrder)
                      ? 'Order Confirmed by Admin: Assign a local workshop to fulfill this order.'
                      : isVendorConfirmationPending(viewingOrder)
                      ? (orderModalPerspective === 'admin'
                          ? \`Vendor Confirmation Pending: Order assigned to \${viewingOrder.assignedVendorName || 'Shop Vendor'}. Waiting for shop to review & accept.\`
                          : 'Action Required: Order assigned to your shop. Review order & accept to begin prep.')
                      : isWorkshopInPrep(viewingOrder)
                      ? (orderModalPerspective === 'admin'
                          ? \`In Preparation: \${viewingOrder.assignedVendorName || 'Shop Vendor'} is crafting & packaging items.\`
                          : 'In Preparation: Items crafting. Click below once packed:')
                      : (viewingOrder.status === 'Ready for Pickup' || viewingOrder.stage === 'ready_for_pickup')
                      ? ((viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch')
                          ? \`Items Packed: Shop Vendor (\${viewingOrder.assignedVendorName || 'Vendor'}) is self-dispatching via rider\`
                          : (isIndore ? 'Items Ready: Dispatch Self-Pickup (Rapido/Porter/Uber) with Dual OTPs' : 'Items Ready: Dispatch Platform Courier Shipping'))
                      : viewingOrder.status === 'In Transit' || viewingOrder.status === 'Dispatched'
                      ? ((viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch')
                          ? \`In Transit: Shipped by \${viewingOrder.assignedVendorName || 'Shop Vendor'} (\${viewingOrder.logistics?.provider || 'Rider'}). Ask customer for Drop OTP\`
                          : \`Out for Delivery (\${viewingOrder.logistics?.provider || 'Rider'}). Ask customer for Drop OTP\`)
                      : viewingOrder.status === 'Delivered'
                      ? 'Handover Completed & Verified with Customer Drop OTP'
                      : 'Order Cancelled'}
                  </p>
                </div>
              </div>

              {/* Right: Action Buttons (In ONE ROW at top) */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* 1. Fresh Pending -> Accept & Reject button */}
                {isFreshPending(viewingOrder) && (
                  <>
                    <button
                      type="button"
                      onClick={async () => {
                        if (orderModalPerspective === 'admin' || !viewingOrder.assignedVendorId) {
                          await handleConfirmOrder(viewingOrder.id);
                        } else {
                          await handleUpdateStatus(viewingOrder.id, 'Accepted');
                          setViewingOrder(prev => prev ? ({ ...prev, status: 'Accepted', assignmentAccepted: true, acceptedAt: new Date().toISOString() }) : null);
                          showToast('Order accepted! Please begin item preparation.');
                        }
                      }}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <CheckCircle size={15} />
                      <span>Accept &amp; Confirm Order</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (orderModalPerspective === 'admin') {
                          handleOpenAdminCancelModal(viewingOrder);
                        } else {
                          handleOpenVendorRejectModal(viewingOrder);
                        }
                      }}
                      className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/50 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <XCircle size={15} />
                      <span>Decline</span>
                    </button>
                  </>
                )}

                {/* 2. Confirmed by Admin, Awaiting Workshop Assignment */}
                {isAwaitingWorkshopAssignment(viewingOrder) && (
                  <button
                    type="button"
                    onClick={() => setActiveActionStep(2)}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer animate-pulse"
                  >
                    <Building size={16} />
                    <span>Assign Workshop Now &rarr;</span>
                  </button>
                )}

                {/* 3. Vendor Confirmation Pending */}
                {isVendorConfirmationPending(viewingOrder) && (
                  orderModalPerspective === 'admin' ? (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 bg-amber-500/20 border border-amber-400/50 text-amber-300 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                        <Clock size={14} className="text-amber-400" />
                        <span>Awaiting Vendor Acceptance</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveActionStep(2)}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <span>Reassign</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={async () => {
                          await handleUpdateStatus(viewingOrder.id, 'Accepted');
                          setViewingOrder(prev => prev ? ({ ...prev, status: 'Accepted', assignmentAccepted: true, acceptedAt: new Date().toISOString() }) : null);
                          showToast('Order accepted! Please begin item preparation.');
                        }}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <CheckCircle size={15} />
                        <span>Accept Order &amp; Begin Prep</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenVendorRejectModal(viewingOrder)}
                        className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/50 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <XCircle size={15} />
                        <span>Decline</span>
                      </button>
                    </>
                  )
                )}

                {/* 4. Accepted / In Preparation -> Mark Ready For Pickup button (For Vendor) or Workshop Status (For Admin) */}
                {isWorkshopInPrep(viewingOrder) && (
                  orderModalPerspective === 'vendor' ? (
                    <>
                      <button
                        type="button"
                        onClick={async () => {
                          await handleMarkReadyForPickup(viewingOrder.id);
                        }}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer animate-pulse"
                      >
                        <Package size={16} />
                        <span>Mark Ready For Pickup</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenVendorRejectModal(viewingOrder)}
                        className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <span>Decline</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-2 bg-indigo-900/50 border border-indigo-700/60 text-indigo-300 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Package size={14} className="text-indigo-400" />
                        <span>Workshop Preparing</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveActionStep(2)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        title="Change Assigned Workshop"
                      >
                        <span>Reassign</span>
                      </button>
                    </div>
                  )
                )}`;

applyReplace('Fix 3: Top Command Bar Subtitle and Buttons', target3, replacement3);

// FIX 4: Pipeline Step 1 & Step 2 status checks and dynamic label
const target4 = `                {/* 1. Confirmed */}
                {(() => {
                  const step1Done = ['Confirmed', 'Accepted', 'Packed', 'Ready for Pickup', 'In Transit', 'Dispatched', 'Shipped', 'Delivered'].includes(viewingOrder.status) || isOrderAccepted(viewingOrder);`;

const replacement4 = `                {/* 1. Confirmed */}
                {(() => {
                  const step1Done = ['Confirmed', 'Vendor Assigned', 'Accepted', 'Packed', 'Ready for Pickup', 'In Transit', 'Dispatched', 'Shipped', 'Delivered'].includes(viewingOrder.status) || isOrderAccepted(viewingOrder);`;

applyReplace('Fix 4a: Pipeline Step 1', target4, replacement4);

const target4_b = `                {/* 2. Packed */}
                {(() => {
                  const step1Done = ['Confirmed', 'Accepted', 'Packed', 'Ready for Pickup', 'In Transit', 'Dispatched', 'Shipped', 'Delivered'].includes(viewingOrder.status) || isOrderAccepted(viewingOrder);
                  const step2Done = ['Packed', 'Ready for Pickup', 'In Transit', 'Dispatched', 'Shipped', 'Delivered'].includes(viewingOrder.status);
                  const step2Active = step1Done && !step2Done;
                  return (
                    <button
                      type="button"
                      onClick={() => handlePipelineStatusChange(viewingOrder.id, 'Packed')}
                      className={\`p-3 rounded-xl border-2 text-left transition-all cursor-pointer \${
                        step2Done
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm ring-1 ring-emerald-500/30'
                          : step2Active
                          ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/50 animate-pulse'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                      }\`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase">Step 2</span>
                        {step2Done ? (
                          <CheckCircle2 size={14} className="text-emerald-400" />
                        ) : step2Active ? (
                          <Package size={14} className="text-amber-400" />
                        ) : (
                          <Package size={14} className="text-slate-500" />
                        )}
                      </div>
                      <p className="font-bold text-xs mt-1 text-white flex items-center gap-1">
                        <span>Packed</span>
                        {step2Done && <span className="text-emerald-400 text-[10px] font-black">✓</span>}
                      </p>
                      <span className={\`text-[9px] block mt-0.5 font-mono \${step2Active ? 'text-amber-300 font-bold' : 'text-slate-400'}\`}>
                        {viewingOrder.packedAt 
                          ? new Date(viewingOrder.packedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                          : (step2Active ? 'In Preparation...' : 'Set Packed')}
                      </span>
                    </button>
                  );
                })()}`;

const replacement4_b = `                {/* 2. Packed */}
                {(() => {
                  const step1Done = ['Confirmed', 'Vendor Assigned', 'Accepted', 'Packed', 'Ready for Pickup', 'In Transit', 'Dispatched', 'Shipped', 'Delivered'].includes(viewingOrder.status) || isOrderAccepted(viewingOrder);
                  const step2Done = ['Packed', 'Ready for Pickup', 'In Transit', 'Dispatched', 'Shipped', 'Delivered'].includes(viewingOrder.status);
                  const step2Active = step1Done && !step2Done;
                  return (
                    <button
                      type="button"
                      onClick={() => handlePipelineStatusChange(viewingOrder.id, 'Packed')}
                      className={\`p-3 rounded-xl border-2 text-left transition-all cursor-pointer \${
                        step2Done
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm ring-1 ring-emerald-500/30'
                          : step2Active
                          ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/50 animate-pulse'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                      }\`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase">Step 2</span>
                        {step2Done ? (
                          <CheckCircle2 size={14} className="text-emerald-400" />
                        ) : step2Active ? (
                          <Package size={14} className="text-amber-400" />
                        ) : (
                          <Package size={14} className="text-slate-500" />
                        )}
                      </div>
                      <p className="font-bold text-xs mt-1 text-white flex items-center gap-1">
                        <span>Packed</span>
                        {step2Done && <span className="text-emerald-400 text-[10px] font-black">✓</span>}
                      </p>
                      <span className={\`text-[9px] block mt-0.5 font-mono \${step2Active ? 'text-amber-300 font-bold' : 'text-slate-400'}\`}>
                        {viewingOrder.packedAt 
                          ? new Date(viewingOrder.packedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                          : (step2Active ? (isVendorConfirmationPending(viewingOrder) ? 'Awaiting Acceptance' : 'In Preparation...') : 'Set Packed')}
                      </span>
                    </button>
                  );
                })()`;

applyReplace('Fix 4b: Pipeline Step 2', target4_b, replacement4_b);

// FIX 5: Hero Action Banner Collapse Fix & Continuous Alert Banner
const target5 = `            {/* 2. SCROLLABLE DIALOG BODY */}
            <div className="max-h-[76vh] overflow-y-auto pr-1 space-y-4 no-scrollbar pt-2">
              {orderModalPerspective === 'vendor' ? (
                renderShopVendorDialogue()
              ) : (
                <>
                  {/* HERO ACTION BANNER (Shown from Step 2 onwards to guide workshop assignment, dispatch, and delivery OTP) */}
                  {viewingOrder.status !== 'Pending' && (
                    <div className={\`p-4 sm:p-5 rounded-2xl border transition-all \${
                      viewingOrder.reassignmentNeeded || (viewingOrder.status === 'Confirmed' && !viewingOrder.assignedVendorId)
                        ? 'bg-purple-50/80 border-purple-300 shadow-xs'
                        : viewingOrder.status === 'Ready for Pickup' || (viewingOrder.assignedVendorId && viewingOrder.status !== 'In Transit' && viewingOrder.status !== 'Delivered')
                        ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                        : viewingOrder.status === 'In Transit' || viewingOrder.status === 'Shipped'
                        ? 'bg-sky-50/80 border-sky-300 shadow-xs'
                        : 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                    }\`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {viewingOrder.status === 'Delivered' ? (
                              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                            )}
                            <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900">
                              {viewingOrder.reassignmentNeeded ? '⚠️ Attention: Reassign Partner Workshop' :
                               !viewingOrder.assignedVendorId ? 'Action Required: Assign Partner Workshop' :
                               viewingOrder.status === 'Ready for Pickup' ? (isIndore ? 'Workshop Ready: Dispatch Local Fleet' : 'Package Ready: Ship via Courier') :
                               viewingOrder.status === 'In Transit' ? (isIndore ? 'Out for Delivery: Verify Customer OTP' : 'In Transit: Confirm Courier Handover') :
                               'Order Fulfilled & Handover Verified'}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 font-medium max-w-2xl">
                            {viewingOrder.reassignmentNeeded ? 'Previous vendor declined. Select an alternate workshop below to ensure on-time delivery.' :
                             !viewingOrder.assignedVendorId ? 'Order confirmed! Assign a local partner workshop to prepare and package this gift.' :
                             viewingOrder.status === 'Ready for Pickup' ? (isIndore ? \`Items prepared by shop. Driver must quote Pickup OTP \${viewingOrder.pickupOtp || '8097'} at counter.\` : \`Courier carton packed. Enter AWB tracking number to notify customer.\`) :
                             viewingOrder.status === 'In Transit' ? (isIndore ? \`Driver is at recipient doorstep in Indore. Collect 4-digit Delivery OTP to complete handover.\` : \`Package shipped via \${viewingOrder.logistics?.provider || 'Courier'}. Confirm delivery when tracking completes.\`) :
                             \`All items successfully handed over. 7-day settlement window initiated automatically.\`}
                          </p>
                        </div>

                        {/* Primary Action Controls right on the Hero Banner */}
                        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                          {viewingOrder.reassignmentNeeded || (!viewingOrder.assignedVendorId && viewingOrder.status !== 'Delivered') ? (
                            <button
                              onClick={() => setActiveActionStep(2)}
                              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Building size={16} />
                              <span>Assign Workshop Now &rarr;</span>
                            </button>
                          ) : (viewingOrder.status === 'Ready for Pickup' || (viewingOrder.assignedVendorId && viewingOrder.status !== 'In Transit' && viewingOrder.status !== 'Delivered')) ? (
                            <button
                              onClick={() => setActiveActionStep(3)}
                              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Truck size={16} />
                              <span>{isIndore ? 'Dispatch Delivery Fleet' : 'Enter Courier Tracking'} &rarr;</span>
                            </button>
                          ) : viewingOrder.status === 'In Transit' ? (
                            <button
                              onClick={() => setActiveActionStep(4)}
                              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCheck size={16} />
                              <span>{isIndore ? 'Verify Delivery OTP' : 'Confirm Handover'} &rarr;</span>
                            </button>
                          ) : (
                            <span className="px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                              <ShieldCheck size={15} className="text-emerald-700" />
                              <span>Fulfilled</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}`;

const replacement5 = `            {/* 2. SCROLLABLE DIALOG BODY */}
            <div className="max-h-[76vh] overflow-y-auto pr-1 space-y-4 no-scrollbar pt-2">
              {orderModalPerspective === 'vendor' ? (
                renderShopVendorDialogue()
              ) : (
                <>
                  {/* CONTINUOUS VENDOR CONFIRMATION PENDING ALERT (For Master Admin) */}
                  {isVendorConfirmationPending(viewingOrder) && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border-2 border-amber-500/70 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                          <Clock size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900">
                              Vendor Confirmation is Pending
                            </h5>
                            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono font-black text-[10px] uppercase border border-amber-300 animate-ping">
                              Awaiting
                            </span>
                          </div>
                          <p className="text-xs text-amber-800 font-medium mt-0.5">
                            Order assigned to <strong className="text-slate-900">\${viewingOrder.assignedVendorName || 'Partner Workshop'}</strong>. Waiting for shop partner to review order details &amp; accept.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setActiveActionStep(2)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Building size={14} />
                          <span>Reassign Workshop</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* HERO ACTION BANNER (Accurate Stage State, No Collapse) */}
                  {viewingOrder.status !== 'Pending' && (
                    <div className={\`p-4 sm:p-5 rounded-2xl border transition-all \${
                      viewingOrder.reassignmentNeeded || (viewingOrder.status === 'Confirmed' && !viewingOrder.assignedVendorId)
                        ? 'bg-purple-50/80 border-purple-300 shadow-xs'
                        : isVendorConfirmationPending(viewingOrder)
                        ? 'bg-amber-50/90 border-amber-300 shadow-xs ring-1 ring-amber-400/40'
                        : isWorkshopInPrep(viewingOrder)
                        ? 'bg-indigo-50/80 border-indigo-300 shadow-xs'
                        : viewingOrder.status === 'Ready for Pickup'
                        ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                        : viewingOrder.status === 'In Transit' || viewingOrder.status === 'Shipped' || viewingOrder.status === 'Dispatched'
                        ? 'bg-sky-50/80 border-sky-300 shadow-xs'
                        : 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                    }\`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {viewingOrder.status === 'Delivered' ? (
                              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                            )}
                            <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900">
                              {viewingOrder.reassignmentNeeded ? '⚠️ Attention: Reassign Partner Workshop' :
                               !viewingOrder.assignedVendorId ? 'Action Required: Assign Partner Workshop' :
                               isVendorConfirmationPending(viewingOrder) ? \`⏳ Vendor Confirmation Pending: Waiting for \${viewingOrder.assignedVendorName || 'Shop Vendor'}\` :
                               isWorkshopInPrep(viewingOrder) ? \`Workshop In Preparation: \${viewingOrder.assignedVendorName || 'Shop Partner'} is preparing package\` :
                               viewingOrder.status === 'Ready for Pickup' ? ((viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch') ? \`Package Ready: \${viewingOrder.assignedVendorName || 'Shop Vendor'} Self-Dispatching\` : (isIndore ? 'Workshop Ready: Dispatch Local Fleet' : 'Package Ready: Ship via Courier')) :
                               viewingOrder.status === 'In Transit' || viewingOrder.status === 'Dispatched' ? ((viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch') ? \`In Transit: Shipped by \${viewingOrder.assignedVendorName || 'Shop Vendor'}\` : (isIndore ? 'Out for Delivery: Verify Customer OTP' : 'In Transit: Confirm Courier Handover')) :
                               viewingOrder.status === 'Delivered' ? 'Order Fulfilled & Handover Verified' :
                               \`Current Status: \${viewingOrder.status}\`}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 font-medium max-w-2xl">
                            {viewingOrder.reassignmentNeeded ? 'Previous vendor declined. Select an alternate workshop below to ensure on-time delivery.' :
                             !viewingOrder.assignedVendorId ? 'Order confirmed! Assign a local partner workshop to prepare and package this gift.' :
                             isVendorConfirmationPending(viewingOrder) ? \`Assigned to \${viewingOrder.assignedVendorName || 'Shop Vendor'}. Vendor confirmation is pending. Waiting for vendor to review & accept.\` :
                             isWorkshopInPrep(viewingOrder) ? \`\${viewingOrder.assignedVendorName || 'Shop Partner'} has accepted the order and is crafting and packaging the items.\` :
                             viewingOrder.status === 'Ready for Pickup' ? ((viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch') ? 'Shop vendor has packaged items and is assigning a delivery rider.' : (isIndore ? \`Items prepared by shop. Driver must quote Pickup OTP \${viewingOrder.pickupOtp || '8097'} at counter.\` : \`Courier carton packed. Enter AWB tracking number to notify customer.\`)) :
                             viewingOrder.status === 'In Transit' || viewingOrder.status === 'Dispatched' ? ((viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch') ? \`Package is with vendor-dispatched rider (\${viewingOrder.logistics?.provider || 'Rider'}). Ask customer for Drop OTP at doorstep.\` : (isIndore ? \`Driver is at recipient doorstep in Indore. Collect 4-digit Delivery OTP to complete handover.\` : \`Package shipped via \${viewingOrder.logistics?.provider || 'Courier'}. Confirm delivery when tracking completes.\`)) :
                             viewingOrder.status === 'Delivered' ? 'All items successfully handed over. 7-day settlement window initiated automatically.' :
                             \`Status: \${viewingOrder.status}\`}
                          </p>
                        </div>

                        {/* Primary Action Controls right on the Hero Banner */}
                        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                          {viewingOrder.reassignmentNeeded || (!viewingOrder.assignedVendorId && viewingOrder.status !== 'Delivered') ? (
                            <button
                              onClick={() => setActiveActionStep(2)}
                              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Building size={16} />
                              <span>Assign Workshop Now &rarr;</span>
                            </button>
                          ) : isVendorConfirmationPending(viewingOrder) ? (
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                                <Clock size={14} className="text-amber-600" />
                                <span>Waiting for Acceptance</span>
                              </span>
                              <button
                                onClick={() => setActiveActionStep(2)}
                                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                Reassign
                              </button>
                            </div>
                          ) : isWorkshopInPrep(viewingOrder) ? (
                            <div className="flex items-center gap-2">
                              <span className="px-3.5 py-2 bg-indigo-100 text-indigo-900 border border-indigo-300 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                <Package size={14} className="text-indigo-600" />
                                <span>Shop Crafting Items</span>
                              </span>
                            </div>
                          ) : viewingOrder.status === 'Ready for Pickup' ? (
                            (viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch') ? (
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                  <Truck size={14} className="text-emerald-600" />
                                  <span>Vendor Self-Dispatching</span>
                                </span>
                                <button
                                  onClick={() => setActiveActionStep(3)}
                                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  View Logistics &rarr;
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setActiveActionStep(3)}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <Truck size={16} />
                                <span>{isIndore ? 'Dispatch Delivery Fleet' : 'Enter Courier Tracking'} &rarr;</span>
                              </button>
                            )
                          ) : viewingOrder.status === 'In Transit' || viewingOrder.status === 'Dispatched' ? (
                            <button
                              onClick={() => setActiveActionStep(4)}
                              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCheck size={16} />
                              <span>{isIndore ? 'Verify Delivery OTP' : 'Confirm Handover'} &rarr;</span>
                            </button>
                          ) : (
                            <span className="px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                              <ShieldCheck size={15} className="text-emerald-700" />
                              <span>Fulfilled</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}`;

applyReplace('Fix 5: Hero Action Banner Collapse Fix & Alert Banner', target5, replacement5);

// FIX 6: Shop Vendor Dialogue Delivery Split (Admin Handled vs Vendor Self-Dispatch)
const stageCComment = '                {/* STAGE C: Dispatch Flow (Local Indore Self Dispatch vs Outside Indore Courier) */}';
const startIdx6 = content.indexOf(stageCComment);
const outsideCourierMarker = '                      /* OUTSIDE INDORE: DOMESTIC COURIER PICKUP */';
const endIdx6 = content.indexOf(outsideCourierMarker);
if (startIdx6 === -1 || endIdx6 === -1) {
  console.error('[ERROR] Could not find STAGE C block boundaries in AdminPanel.jsx', { startIdx6, endIdx6 });
  process.exit(1);
}
const target6 = content.substring(startIdx6, endIdx6);

const replacement6 = `                {/* STAGE C: Dispatch Flow (Admin Handled vs Vendor Self Dispatch) */}
                {(viewingOrder.stage === 'ready_for_pickup' || viewingOrder.status === 'Ready for Pickup' || viewingOrder.status === 'In Transit' || viewingOrder.stage === 'out_for_delivery') && (
                  <div className="space-y-3">
                    {/* CASE 1: DELIVERY HANDLED BY MASTER ADMIN (Zero Effort Business Solution) */}
                    {(viewingOrder.shipmentArrangedBy !== 'vendor_self' && viewingOrder.logistics?.type !== 'vendor_self_dispatch') ? (
                      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-6 rounded-3xl border-2 border-indigo-400 shadow-xl space-y-4">
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-white shrink-0 shadow-inner">
                            <ShieldCheck size={28} className="text-indigo-300" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[10px] font-black uppercase tracking-wider">
                                Managed by System Admin
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                                No Action Needed
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-black tracking-wide text-white">
                              This delivery is being handled by System Admin.
                            </h4>
                            <p className="text-xs sm:text-sm text-indigo-100/90 font-medium leading-relaxed">
                              System admin or assigned delivery partner will come to your business location and collect the parcel no need to do anything.
                            </p>
                          </div>
                        </div>

                        {/* Counter Pickup Code Card */}
                        <div className="bg-slate-900/90 p-4 rounded-2xl border border-indigo-400/30 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 block mb-0.5">
                              Pickup Location
                            </span>
                            <p className="text-xs text-white font-bold truncate">
                              {viewingOrder.vendorPickupAddress || 'Your registered business location'}
                            </p>
                            <p className="text-[11px] text-indigo-200/80 mt-0.5 font-medium">
                              Collection Window: Working hours ({viewingOrder.vendorWorkingHours || '08:30 AM - 10:30 PM'}).
                            </p>
                          </div>

                          <div className="bg-purple-950/80 p-3 rounded-xl border border-purple-400/40 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                                Counter Pickup OTP
                              </span>
                              <span className="text-[11px] text-slate-300">
                                Quote when driver arrives
                              </span>
                            </div>
                            <span className="text-xl font-mono font-black text-amber-400 bg-slate-950 px-3 py-1 rounded-lg border border-purple-400 tracking-wider">
                              {vendorPickupOtp || viewingOrder.pickupOtp || '8097'}
                            </span>
                          </div>
                        </div>

                        {/* Status & Options Footer */}
                        <div className="flex items-center justify-between text-xs text-indigo-200 border-t border-indigo-800/60 pt-3 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5">
                              <Clock size={13} className="text-indigo-400" />
                              <span>Status: <strong className="text-white">{viewingOrder.status}</strong></span>
                            </span>
                            {viewingOrder.status === 'In Transit' && (
                              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
                                🚀 Parcel collected by Admin fleet &amp; In Transit
                              </span>
                            )}
                          </div>

                          {viewingOrder.status !== 'In Transit' && viewingOrder.status !== 'Delivered' && (
                            <button
                              type="button"
                              onClick={() => handleSelectShipmentMode(viewingOrder.id, 'vendor_self')}
                              className="text-[11px] text-indigo-300 hover:text-white font-bold underline transition-colors cursor-pointer"
                            >
                              I want to ship myself instead &rarr;
                            </button>
                          )}
                        </div>
                      </div>
                    ) : isIndore ? (
                      /* LOCAL INDORE: SELF DISPATCH (Rapido, Porter, Uber, Own Fleet) */
                      <div id="self-dispatch-section" className="bg-white p-5 rounded-3xl border-2 border-emerald-300 space-y-4 shadow-sm">
                        {viewingOrder.status === 'In Transit' && (
                          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-emerald-950 shadow-2xs">
                            <div className="flex items-center gap-2.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                              <div>
                                <h6 className="text-xs font-black uppercase tracking-wider text-emerald-900">
                                  🚀 Rider Dispatched &amp; Package In Transit
                                </h6>
                                <p className="text-[11px] text-emerald-800 font-medium">
                                  Assigned to <strong>{viewingOrder.logistics?.driverName || 'Rider'}</strong> ({viewingOrder.logistics?.provider || 'Rapido'}{viewingOrder.logistics?.driverMobile ? \` • \${viewingOrder.logistics.driverMobile}\` : ''}). Driver will ask customer for Drop OTP at doorstep.
                                </p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider rounded-xl shrink-0 shadow-xs">
                              ✓ In Transit
                            </span>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-100 pb-2.5 gap-2">
                          <div>
                            <h5 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                              <Zap size={14} className="text-emerald-600" />
                              <span>Local Indore Delivery — Self Dispatch Options</span>
                            </h5>
                            <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                              Book a local delivery rider via Rapido, Porter, Uber, or dispatch via your own shop fleet:
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                              <span className="text-[9px] font-black uppercase tracking-widest text-amber-700 block">Pickup OTP</span>
                              <span className="text-base font-mono font-black text-amber-900">
                                {vendorPickupOtp || viewingOrder.pickupOtp || '8097'}
                              </span>
                            </div>
                            <div className="text-right bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Customer Drop OTP</span>
                              <span className="text-xs font-mono font-bold text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                                <Lock size={11} /> Admin &amp; Customer Only
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Service Selectors */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'Rapido', label: 'Rapido Bike', emoji: '🛵' },
                            { id: 'Porter', label: 'Porter', emoji: '🚚' },
                            { id: 'Uber', label: 'Uber Package', emoji: '🚗' },
                            { id: 'Own Rider', label: 'Shop Rider', emoji: '🚲' }
                          ].map(svc => (
                            <button
                              key={svc.id}
                              type="button"
                              onClick={() => setVendorDispatchService(svc.id)}
                              className={\`p-2.5 rounded-2xl border text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer \${
                                vendorDispatchService === svc.id
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }\`}
                            >
                              <span>{svc.emoji}</span>
                              <span>{svc.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Rider Details Input */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                              Rider / Driver Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Ramesh (Rapido)"
                              value={vendorRiderName}
                              onChange={(e) => setVendorRiderName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                              Rider Mobile Number
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 98765 43210"
                              value={vendorRiderPhone}
                              onChange={(e) => setVendorRiderPhone(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                              Ride ID / Tracking Link
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. RAP-9821 or track url"
                              value={vendorRideRef}
                              onChange={(e) => setVendorRideRef(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        {/* DUAL MANUAL OTP INPUTS: 1. Pickup OTP | 2. Drop OTP */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-amber-50/70 via-emerald-50/50 to-teal-50/70 border border-emerald-200 shadow-2xs">
                          {/* 1. Pickup OTP (Manual Entry) */}
                          <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                                <Key size={14} className="text-amber-600" />
                                <span>1. Pickup OTP (Manual Entry)</span>
                              </label>
                              <span className="text-[9px] font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded-md">
                                For Record Purpose
                              </span>
                            </div>
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="e.g. 4821"
                              value={vendorPickupOtp}
                              onChange={(e) => setVendorPickupOtp(e.target.value.replace(/\D/g, ''))}
                              className="w-full bg-slate-50 border-2 border-amber-300 rounded-xl px-3 py-2 text-sm font-mono font-black text-amber-950 focus:outline-none focus:border-amber-500 tracking-wider"
                            />
                            <p className="text-[10.5px] text-slate-500 font-medium leading-tight">
                              Shop counter record: Driver quotes this pickup code when collecting parcel from counter.
                            </p>
                          </div>

                          {/* 2. Customer Drop OTP Privacy Card */}
                          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                <Lock size={14} className="text-slate-500" />
                                <span>2. Customer Drop OTP</span>
                              </label>
                              <span className="text-[9px] font-bold text-slate-600 uppercase bg-slate-200 px-2 py-0.5 rounded-md">
                                Confidential
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              🔒 Note: Customer DROP OTP is confidential and visible only to Admin and the Customer. The delivery executive will ask the customer for the Drop OTP at their doorstep upon arrival to mark successful delivery.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
                          <div className="flex items-center gap-3">
                            <p className="text-[11px] text-slate-500 font-medium">
                              Counter Pickup OTP is quoted by delivery rider at your counter to collect the package.
                            </p>
                            <button
                              type="button"
                              onClick={() => handleSelectShipmentMode(viewingOrder.id, 'admin_pickup')}
                              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
                            >
                              Switch: Request Admin Delivery
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSaveSelfPickupOtps(viewingOrder.id)}
                              className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                              title="Save Counter Pickup OTP"
                            >
                              <Save size={14} />
                              <span>Save Pickup OTP</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVendorSelfDispatch(viewingOrder.id)}
                              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                            >
                              <Truck size={14} />
                              <span>{viewingOrder.status === 'In Transit' ? 'Update Rider & Save' : 'Dispatch Rider & Save OTP'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (`;

applyReplace('Fix 6: Vendor Dialogue Delivery Split', target6, replacement6);

// FIX 7: Admin Step 3 Dispatch Hub - Vendor Self-Shipping Details Card
const target7 = `                      {isIndore ? (
                        /* Indore Local Dispatch Hub (Admin Perspective) */
                        <div className="space-y-4">`;

const replacement7 = `                      {/* If order is being shipped by Shop Vendor, show Admin live delivery details */}
                      {(viewingOrder.shipmentArrangedBy === 'vendor_self' || viewingOrder.logistics?.type === 'vendor_self_dispatch') ? (
                        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 rounded-3xl p-5 space-y-4 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200 pb-3">
                            <div className="flex items-start sm:items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                                <Truck size={20} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-emerald-950">
                                    Order is being shipped by Shop Vendor (\${viewingOrder.assignedVendorName || 'Shop Partner'})
                                  </h4>
                                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider shadow-2xs">
                                    {viewingOrder.status === 'In Transit' ? '🚀 In Transit' : viewingOrder.status}
                                  </span>
                                </div>
                                <p className="text-xs text-emerald-800 font-medium mt-0.5">
                                  The shop partner is handling delivery directly using their assigned delivery partner. Live delivery details below:
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Live Delivery Details as updated by Shop Vendor */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Delivery Platform</span>
                              <p className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                                <Zap size={15} className="text-amber-500 fill-amber-500 shrink-0" />
                                <span>{viewingOrder.logistics?.provider || 'Shop Delivery Rider'}</span>
                              </p>
                            </div>

                            <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Delivery Person Name</span>
                              <p className="text-sm font-black text-slate-900">
                                {viewingOrder.logistics?.driverName || (viewingOrder.status === 'In Transit' ? 'Assigned Rider' : 'Awaiting Rider Assignment')}
                              </p>
                            </div>

                            <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Rider Contact Number</span>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-mono font-bold text-slate-900">
                                  {viewingOrder.logistics?.driverMobile || 'N/A'}
                                </p>
                                {viewingOrder.logistics?.driverMobile && viewingOrder.logistics.driverMobile !== 'N/A' && (
                                  <a
                                    href={\`tel:\${viewingOrder.logistics.driverMobile.replace(/\\D/g, '')}\`}
                                    className="p-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                                    title="Call Rider"
                                  >
                                    <Phone size={13} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Ride Ref / Tracking URL if available */}
                          {(viewingOrder.logistics?.rideBookingId || viewingOrder.logistics?.trackingUrl) && (
                            <div className="bg-white p-3 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                              <span className="text-slate-600 font-medium">Ride Booking / Tracking Link:</span>
                              <span className="font-mono font-bold text-slate-900">{viewingOrder.logistics.rideBookingId || viewingOrder.logistics.trackingUrl}</span>
                            </div>
                          )}

                          {/* Doorstep Handover Action */}
                          <div className="flex items-center justify-between pt-2 border-t border-emerald-200 flex-wrap gap-2">
                            <p className="text-xs text-emerald-900 font-medium">
                              Once rider reaches customer doorstep, verify the Customer Drop OTP to confirm successful delivery:
                            </p>
                            <button
                              type="button"
                              onClick={() => setActiveActionStep(4)}
                              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCheck size={15} />
                              <span>Verify Customer Drop OTP &rarr;</span>
                            </button>
                          </div>
                        </div>
                      ) : isIndore ? (
                        /* Indore Local Dispatch Hub (Admin Perspective) */
                        <div className="space-y-4">`;

applyReplace('Fix 7: Admin Step 3 Dispatch Hub - Vendor Self-Shipping Details Card', target7, replacement7);

const finalContent = hasCRLF ? content.replace(/\n/g, '\r\n') : content;
fs.writeFileSync(targetPath, finalContent, 'utf8');
console.log('All fixes applied successfully! New length:', finalContent.length);
