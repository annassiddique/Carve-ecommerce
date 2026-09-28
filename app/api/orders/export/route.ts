import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Order, { IOrderItem } from '@/models/Order'
import ExcelJS from 'exceljs'

// ARGB format for exceljs
const C = {
  forest:    'FF1A3D2B',
  gold:      'FFC8A96E',
  ivory:     'FFF5F0E8',
  white:     'FFFFFFFF',
  mink:      'FF8B7355',
  champagne: 'FFE8D5B0',
  sage:      'FF4A6741',
}

const HEADERS = [
  'Order #',
  'Date',
  'Customer Name',
  'Email',
  'Phone',
  'City',
  'Address',
  'Items Ordered',
  'Subtotal (PKR)',
  'Shipping (PKR)',
  'Total (PKR)',
  'Payment Method',
  'Payment Status',
  'Order Status',
  'Notes',
]

const COL_WIDTHS = [22, 16, 22, 30, 15, 14, 38, 48, 15, 15, 14, 18, 20, 16, 28]

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function fmtStatus(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function fmtPayment(s: string) {
  return s === 'cod' ? 'Cash on Delivery' : 'EasyPaisa'
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean()

  const wb = new ExcelJS.Workbook()
  wb.creator = 'CARVE Admin'
  wb.created = new Date()

  const ws = wb.addWorksheet('Orders', {
    views: [{ state: 'frozen', ySplit: 3 }],
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1 },
  })

  // Column widths
  COL_WIDTHS.forEach((w, i) => {
    ws.getColumn(i + 1).width = w
  })

  // ── Row 1: Brand title ────────────────────────────────────────
  ws.addRow(Array(HEADERS.length).fill(null))
  ws.mergeCells(1, 1, 1, HEADERS.length)
  const titleCell = ws.getCell('A1')
  titleCell.value = 'CARVE  ·  Orders Export'
  titleCell.font = { bold: true, size: 18, color: { argb: C.forest }, name: 'Georgia' }
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' }
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.ivory } }
  ws.getRow(1).height = 36

  // ── Row 2: Export metadata ────────────────────────────────────
  ws.addRow(Array(HEADERS.length).fill(null))
  ws.mergeCells(2, 1, 2, HEADERS.length)
  const metaCell = ws.getCell('A2')
  const exportDate = new Date().toLocaleDateString('en-PK', { dateStyle: 'long' })
  metaCell.value = `Exported on ${exportDate}   ·   ${orders.length} orders total`
  metaCell.font = { italic: true, size: 10, color: { argb: C.mink }, name: 'Calibri' }
  metaCell.alignment = { horizontal: 'center', vertical: 'middle' }
  metaCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.ivory } }
  ws.getRow(2).height = 18

  // ── Row 3: Column headers ─────────────────────────────────────
  const headerRow = ws.addRow(HEADERS)
  headerRow.height = 22
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 10, color: { argb: C.white }, name: 'Calibri' }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.forest } }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
    cell.border = {
      top:    { style: 'medium', color: { argb: C.gold } },
      bottom: { style: 'medium', color: { argb: C.gold } },
      left:   { style: 'thin',   color: { argb: C.gold } },
      right:  { style: 'thin',   color: { argb: C.gold } },
    }
  })

  // ── Data rows ─────────────────────────────────────────────────
  orders.forEach((order, idx) => {
    const bg = idx % 2 === 0 ? C.ivory : C.white
    const itemsSummary = order.items.map((i: IOrderItem) => `${i.name} ×${i.quantity}`).join(', ')
    const shipping = Math.round(order.total - order.subtotal)

    const row = ws.addRow([
      order.orderNumber,
      fmtDate(order.createdAt),
      order.customer.name,
      order.customer.email,
      order.customer.phone,
      order.customer.city,
      order.customer.address,
      itemsSummary,
      order.subtotal,
      shipping,
      order.total,
      fmtPayment(order.paymentMethod),
      fmtStatus(order.paymentStatus),
      fmtStatus(order.orderStatus),
      order.notes ?? '',
    ])

    row.height = 15

    row.eachCell({ includeEmpty: true }, (cell, colNum) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } }
      cell.font = { size: 10, name: 'Calibri' }
      cell.border = {
        top:    { style: 'hair', color: { argb: C.champagne } },
        bottom: { style: 'hair', color: { argb: C.champagne } },
        left:   { style: 'hair', color: { argb: C.champagne } },
        right:  { style: 'hair', color: { argb: C.champagne } },
      }

      // PKR columns: right-aligned, number format, Total bold
      if (colNum >= 9 && colNum <= 11) {
        cell.numFmt = '#,##0'
        cell.alignment = { horizontal: 'right', vertical: 'middle' }
        if (colNum === 11) cell.font = { size: 10, name: 'Calibri', bold: true, color: { argb: C.forest } }
      } else if (colNum === 8) {
        // Items column — wrap text
        cell.alignment = { vertical: 'top', wrapText: true }
      } else {
        cell.alignment = { vertical: 'middle' }
      }
    })
  })

  // ── Summary row ───────────────────────────────────────────────
  ws.addRow(Array(HEADERS.length).fill(null))
  const totalRow = ws.addRow([
    ...Array(8).fill(null),
    orders.reduce((s, o) => s + o.subtotal, 0),
    orders.reduce((s, o) => s + Math.round(o.total - o.subtotal), 0),
    orders.reduce((s, o) => s + o.total, 0),
    ...Array(4).fill(null),
  ])
  totalRow.height = 18
  totalRow.eachCell({ includeEmpty: true }, (cell, colNum) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.forest } }
    if (colNum >= 9 && colNum <= 11) {
      cell.numFmt = '#,##0'
      cell.font = { bold: true, size: 10, color: { argb: C.gold }, name: 'Calibri' }
      cell.alignment = { horizontal: 'right', vertical: 'middle' }
      cell.border = {
        top:    { style: 'medium', color: { argb: C.gold } },
        bottom: { style: 'medium', color: { argb: C.gold } },
        left:   { style: 'thin',   color: { argb: C.gold } },
        right:  { style: 'thin',   color: { argb: C.gold } },
      }
    }
  })

  const buffer = await wb.xlsx.writeBuffer()
  const filename = `CARVE-Orders-${new Date().toISOString().slice(0, 10)}.xlsx`

  return new NextResponse(buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
