import * as React from "react"
import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-hidden  rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-100/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800/20"
    >
      <div className="overflow-x-auto">
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "relative [&_tr]:border-b-0 [&_tr]:bg-gradient-to-r [&_tr]:from-slate-50 [&_tr]:to-slate-100 dark:[&_tr]:from-slate-800 dark:[&_tr]:to-slate-700",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr:last-child]:border-0 [&_tr:nth-child(even)]:bg-slate-50/50 dark:[&_tr:nth-child(even)]:bg-slate-800/30",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 font-medium dark:border-slate-700 dark:from-slate-800 dark:to-slate-700 [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "group border-b border-slate-200/60 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm data-[state=selected]:bg-blue-50 data-[state=selected]:shadow-md dark:border-slate-700/60 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-blue-900/20",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-12 px-4 text-left align-middle font-semibold text-slate-700 dark:text-slate-200 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] relative",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-slate-300 after:to-transparent dark:after:via-slate-600",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-3 align-middle text-slate-600 dark:text-slate-300 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-6 text-sm text-slate-500 dark:text-slate-400 font-medium",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}